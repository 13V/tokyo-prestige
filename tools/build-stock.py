#!/usr/bin/env python3
"""Builds data/stock.json from data/source-listings.json (the crawl of tokyoprestige.com.au, 11 Nov 2026).
Nothing here invents a fact. The table below only tidies what the dealer published: a clean model name,
the model code and grade as they appear in the listing title or frame number, and a body category for
filtering. Where the dealer's own fields contradict each other the field is left empty and the conflict
is written to `notes` (and to research/gaps.md)."""
import json, re, os, sys
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
src = json.load(open(os.path.join(ROOT, 'data/source-listings.json')))

# stock no: (model, modelCode, grade, body category, overrides dict)
T = {
 '1221': ('MR2', 'SW20', None, 'Coupe', {}),
 '1459': ('Soarer', 'UZZ31', 'GT Limited', 'Coupe', {'note': 'Title says "Lexus SC UZZ31 SC400 GT Limited"; the make and model fields say Toyota Soarer, which is what a UZZ31 is in Japan. Shown as a Toyota Soarer.'}),
 '1414': ('DB7', None, '3.2 Supercharged', 'Coupe', {}),
 '9942778': ('Skyline GT-R', 'BCNR33', 'Autech Version 40th Anniversary', 'Sedan', {}),
 '1392': ('Land Cruiser 100', 'HDJ101K', 'VX Limited', 'SUV & 4WD', {'transmission': 'Automatic', 'note': 'Title says 4-speed automatic, the spec table says 5-speed.'}),
 '1440': ('Legacy B4', 'BE5', 'RSK', 'Sedan', {'note': 'The listing description is for a different car (a BH5 wagon).'}),
 '1425': ('Celsior', 'UCF21', None, 'Sedan', {}),
 '1219': ('Land Cruiser 100', 'HDJ101K', 'VX Limited', 'SUV & 4WD', {'transmission': 'Automatic', 'note': 'Title says 4-speed automatic, the spec table says 5-speed.'}),
 '512': ('Skyline GT-R', 'BNR34', None, 'Coupe', {'note': 'The listing description calls the car an HR34; title and VIN say BNR34.'}),
 '1403': ('911 Carrera', '996', None, 'Coupe', {}),
 '1429': ('Legacy Touring Wagon', 'BH5', 'GT-B E-tune', 'Wagon', {}),
 '1508': ('Crown', 'JZS171', 'Athlete VX', 'Sedan', {}),
 '1438': ('MR-S', 'ZZW30', None, 'Convertible', {}),
 '1427': ('Crown', 'JZS171', 'Athlete V', 'Sedan', {}),
 '1420': ('Crown Estate', 'JZS171', 'Athlete V', 'Wagon', {}),
 '1320': ('X-Trail', 'PNT30', 'GT', 'SUV & 4WD', {}),
 '1347': ('IS 350', 'GSE21', 'Version L', 'Sedan', {}),
 '1336': ('IS 350', 'GSE21', 'Version L', 'Sedan', {}),
 '1363': ('IS 350', 'GSE21', 'Version L', 'Sedan', {'note': 'Body style is listed as SUV; the car is a sedan.'}),
 '1377': ('Crown Majesta', 'UZS186', None, 'Sedan', {}),
 '1277': ('LS 460', 'USF40', None, 'Sedan', {}),
 '1446': ('LS 460', 'USF40', None, 'Sedan', {}),
 '1510': ('Skyline Coupe', 'CKV36', '370GT', 'Coupe', {'transmission': 'Automatic', 'note': 'Title says 5-speed automatic, the spec table says 7-speed.'}),
 '1393': ('Skyline Coupe', 'CKV36', '370GT Type P', 'Coupe', {}),
 '1398': ('Skyline', 'KV36', '370GT Type S', 'Sedan', {}),
 '1369': ('Skyline', 'KV36', '370GT Type S', 'Sedan', {}),
 '1368': ('Skyline', 'KV36', '370GT Type S', 'Sedan', {}),
 '1306': ('Crown Majesta', 'URS206', 'G Type', 'Sedan', {}),
 '1378': ('Crown Majesta', 'URS206', None, 'Sedan', {}),
 '1412': ('Century', 'GZG50', None, 'Sedan', {}),
 '1366': ('Crown', 'GRS204', 'Athlete', 'Sedan', {}),
 '1451': ('A1', '8X', 'Sport', 'Hatch', {}),
 '1444': ('A7 Sportback', '4G', '3.0 quattro S line', 'Hatch', {}),
 '1488': ('GS 350', 'GRL10R', 'Luxury', 'Sedan', {}),
 '1331': ('LS 460', 'USF45', 'Version C', 'Sedan', {}),
 '1386': ('LS 460', 'USF45', 'Version C', 'Sedan', {}),
 '1424': ('Crown', 'GRS214', 'Athlete G', 'Sedan', {'note': 'Title says CVT 8sp; the spec table says 8-speed automatic.'}),
 '1324': ('Crown', 'GRS214', 'Athlete G', 'Sedan', {'note': 'Title says CVT 8sp; the spec table says 8-speed automatic.'}),
 '1361': ('Crown', 'GRS214', 'Athlete S', 'Sedan', {}),
 '1350': ('Crown', 'GRS214', 'Athlete S', 'Sedan', {}),
 '1330': ('Crown', 'GRS214', 'Athlete S', 'Sedan', {}),
 '1365': ('GS F', 'URL10R', None, 'Sedan', {}),
 '1294': ('LS 460', 'USF45', 'Version C', 'Sedan', {}),
 '1521': ('WRX', 'VA', 'Premium', 'Sedan', {'transmission': 'Lineartronic CVT'}),
 '1332': ('Ignis', 'FF21S', 'Hybrid MZ', 'Hatch', {}),
 '1304': ('E 43 AMG Estate', None, '4MATIC', 'Wagon', {'transmission': '9G-TRONIC 9-speed automatic'}),
 '1326': ('Odyssey Hybrid', 'RC4', 'Absolute', 'People mover', {'transmission': 'e-CVT', 'seats': 7}),
 '1182': ('S 450', 'W222', None, 'Sedan', {}),
 '9974441': ('Alphard Hybrid', 'AYH30W', None, 'People mover', {'seats': 7, 'gradeGap': True, 'note': 'Grade conflict: title says "AGH30W SC", the model field says "Executive Lounge S", the VIN and engine number are a hybrid AYH30. Drivetrain listed as FWD; AYH30 hybrids are E-Four. Confirm grade and drivetrain.', 'drivetrain': None}),
 '1453': ('LS 500', 'VXFA55', None, 'Sedan', {'transmission': '10-speed automatic'}),
 '1297': ('E 53 AMG Estate', 'S213', '4MATIC+', 'Wagon', {'transmission': '9G-TRONIC 9-speed automatic'}),
 '1355': ('Mark X', 'GRX133', '350RDS', 'Sedan', {}),
 '1452': ('Crown Hybrid', 'GWS224', 'G-Executive', 'Sedan', {}),
 '1426': ('Crown Hybrid', 'GWS224', 'G-Executive', 'Sedan', {}),
 '1437': ('M340i xDrive Touring', 'G21', None, 'Wagon', {'transmission': '8-speed Steptronic', 'drivetrain': 'AWD'}),
 '1360': ('RX 450h', 'GYL20', 'F Sport', 'SUV & 4WD', {'transmission': 'e-CVT'}),
 '1397': ('Serena', 'C27', 'Highway Star S-Hybrid', 'People mover', {'seats': 8}),
 '1356': ('Skyline', 'RV37', '400R', 'Sedan', {}),
 '1314': ('Skyline', 'RV37', '400R', 'Sedan', {}),
 '1461': ('Corolla Touring', 'ZWE211W', 'W×B Hybrid', 'Wagon', {}),
 '1232': ('Crown Crossover', 'TZSH35', 'RS Advanced', 'SUV & 4WD', {'drivetrain': 'AWD'}),
 '1292': ('Crown Crossover', 'TZSH35', 'RS Advanced', 'SUV & 4WD', {}),
 '1443': ('Voxy Hybrid', 'ZWR90W', 'S-Z', 'People mover', {'seats': 7, 'note': 'This listing shows the same photos as stock 1442.'}),
 '1442': ('Voxy Hybrid', 'ZWR90W', 'S-Z', 'People mover', {'seats': 7, 'note': 'This listing shows the same photos as stock 1443.'}),
 '1423': ('Carry', 'DA16T', 'KC refrigerated truck (-30°C)', 'Kei truck', {}),
 '1430': ('Super Carry', 'DA16T', 'X', 'Kei truck', {}),
 '1411': ('Super Carry', 'DA16T', 'X Limited', 'Kei truck', {}),
 '1460': ('Crown Sport', 'AZSH36', 'Sport Z', 'SUV & 4WD', {}),
 '1448': ('LBX', 'GAYA16', 'Morizo RR', 'Hatch', {}),
 '1433': ('LBX', 'GAYA16', 'Morizo RR', 'Hatch', {'drivetrain': 'AWD', 'note': 'The engine and VIN lines in the description belong to another car (an RX 450h).'}),
 # coming soon
 '1490': ('S 500 L', 'W140', None, 'Sedan', {}),
 '1473': ('Celsior', 'UCF20', None, 'Sedan', {}),
 '1434': ('XJ', None, '3.2 V8', 'Sedan', {}),
 '1406': ('Pajero Evolution', None, None, 'SUV & 4WD', {'note': 'Frame number is listed as AP1-1004596; a Pajero Evolution is a V55W. Confirm.'}),
 '1465': ('Safari', 'WGY61', None, 'SUV & 4WD', {'engine': '4.5 petrol', 'note': 'Engine listed as "4.5i V6"; the Y61 4.5 is an inline six.'}),
 '1334': ('Alto Works', 'HA12S', None, 'Hatch', {}),
 '1498': ('Legacy B4', 'BE5', None, 'Sedan', {}),
 '1462': ('Land Cruiser 100', 'HDJ101', 'VX Limited G Selection', 'SUV & 4WD', {}),
 '1494': ('XJ', None, 'Executive 3.2 V8', 'Sedan', {}),
 '1439': ('XJ', None, 'Executive 4.0 V8', 'Sedan', {}),
 '1491': ('Celsior', 'UCF31', 'C Specification', 'Sedan', {'grade_as_listed': 'Version C'}),
 '1509': ('Soarer', 'UZZ40', None, 'Convertible', {}),
 '1469': ('Legacy B4', None, None, 'Sedan', {'transmission': '6-speed manual', 'note': 'Frame number listed as BES002187. Title says 6-speed manual. Confirm the grade.'}),
 '1428': ('X-Trail', 'PNT30', 'GT', 'SUV & 4WD', {}),
 '1382': ('Century', 'GZG50', None, 'Sedan', {}),
 '1497': ('Forester', 'SG5', 'Cross Sports', 'SUV & 4WD', {}),
 '1482': ('GT-R', 'R35', 'Premium Edition', 'Coupe', {'note': 'Model field says "Skyline R35 GTR"; the R35 is not a Skyline.'}),
 '1520': ('Crown', 'GRS204', 'Athlete', 'Sedan', {}),
 '1481': ('Crown Majesta', 'URS206', None, 'Sedan', {}),
 '1492': ('Crown Majesta', 'URS206', 'A Type', 'Sedan', {}),
 '1496': ('LS 460', 'USF45', 'Version C', 'Sedan', {'drivetrain': None, 'note': 'Drivetrain listed as RWD; a USF45 is the AWD LS 460.'}),
 '1506': ('Ignis', 'FF21S', 'Hybrid', 'Hatch', {}),
 '1289': ('E 43 AMG Estate', 'S213', '4MATIC', 'Wagon', {'transmission': '9G-TRONIC 9-speed automatic'}),
 '1504': ('Ignis', 'FF21S', 'Hybrid F', 'Hatch', {}),
 '1502': ('Ignis', 'FF21S', 'Hybrid MX', 'Hatch', {}),
 '1485': ('Mark X', 'GRX133', '350RDS', 'Sedan', {}),
 '1519': ('Crown Hybrid', 'GWS224', 'RS Advance', 'Sedan', {}),
 '1516': ('RX 450h', 'GYL20', 'Version L', 'SUV & 4WD', {}),
 '1515': ('RX 450h', 'GYL20', 'Version L', 'SUV & 4WD', {}),
 '1487': ('Crown Hybrid', 'GWS224', 'G-Executive', 'Sedan', {}),
 '1493': ('IS 350', 'GSE31', None, 'Sedan', {}),
 '1449': ('RC F', 'USC10', None, 'Coupe', {}),
 '1480': ('AMG GT 43', None, None, 'Sedan', {'engine': None, 'note': 'Engine listed as 2.0 turbo; the VIN is a four-door GT 43, which has a 3.0 inline six. Confirm.'}),
 '1472': ('Corolla Touring', 'ZWE219', 'W×B Hybrid', 'Wagon', {}),
 '1468': ('Corolla Touring', 'ZWE219', 'W×B Hybrid', 'Wagon', {}),
 '1466': ('Corolla Touring', 'ZWE219', 'W×B Hybrid', 'Wagon', {}),
 '1513': ('Corolla Touring', 'ZWE219', 'W×B Hybrid', 'Wagon', {}),
 '1471': ('Prius PHEV', 'MXWH61', 'Z', 'Hatch', {}),
 '1463': ('Skyline', 'RV37', None, 'Sedan', {'gradeGap': True, 'note': 'Listed as "400R NISMO Edition"; the homepage also says "GRADE 5 A", "only 49kms" and "NISMO Recaro seat plus carbon" while the listing says 47 km. Confirm whether this is a Skyline NISMO or a 400R, and the km.'}),
 '1474': ('Skyline', 'RV37', None, 'Sedan', {'gradeGap': True, 'note': 'Listed as "400R Nismo". Confirm whether this is a Skyline NISMO or a 400R.'}),
 '1479': ('Super Carry', 'DA16T', 'X Limited', 'Kei truck', {}),
 '1512': ('Corolla Touring', 'ZWE219', 'W×B Hybrid', 'Wagon', {}),
 '1486': ('Crown Sedan', 'AZSH32', None, 'Sedan', {'engine': None, 'drivetrain': None, 'note': 'Listed as 2.4 turbo hybrid AWD; an AZSH32 Crown Sedan is a 2.5 hybrid, rear-wheel drive. Confirm.'}),
 '1501': ('Crown Sport', 'AZSH36', 'Sport Z', 'SUV & 4WD', {}),
 '1470': ('Super Carry', 'DA16T', None, 'Kei truck', {}),
 '1478': ('Corolla Touring', 'ZWE219', 'Hybrid special edition', 'Wagon', {}),
 '1484': ('Corolla Touring', 'ZWE219', 'Hybrid special edition', 'Wagon', {}),
 '1476': ('Crown Sport', 'AZSH37', 'Sport RS (PHEV)', 'SUV & 4WD', {'engine': '2.5 plug-in hybrid'}),
 '1517': ('Carry', 'DA16T', 'Dump truck', 'Kei truck', {}),
 '1514': ('Carry', 'DA16T', 'Dump truck', 'Kei truck', {}),
 '1507': ('Super Carry', 'DA16T', None, 'Kei truck', {}),
 '1500': ('Carry', 'DA16T', None, 'Kei truck', {}),
 '1503': ('Super Carry', 'DA16T', None, 'Kei truck', {}),
}
MAKE = {'JAGUAR': 'Jaguar'}
BOILER = ('PREMIUM JAPANESE', 'Discover the finest', 'Every vehicle in our range', '✔', 'As a locally owned', 'We also provide', '????', 'Whether you’re chasing', 'Visit us today', 'www.tokyoprestige')
def tidy_engine(e):
    if not e: return e
    if e.lower().startswith('660cc'): return '660 cc turbo' if 'turbo' in e.lower() else '660 cc'
    e = re.sub(r'(?i)^(\d(?:\.\d)?)\s*(?:ltr|lt|litre|l|i)?(?=\s|$|[A-Z])', r'\1L ', e.strip())
    e = re.sub(r'\bTT\b', 'twin-turbo', e); e = re.sub(r'\bTD\b', 'turbo-diesel', e)
    e = re.sub(r'(?i)twin turbo', 'twin-turbo', e); e = re.sub(r'(?i)turbo charged', 'turbo', e)
    e = re.sub(r'(?i)super ?charged', 'supercharged', e); e = re.sub(r'(?i)turbo & supercharger', 'turbo and supercharger', e)
    e = re.sub(r'(?i)\bPHEV\b', 'plug-in hybrid', e); e = re.sub(r'(?i)\b6 ?cyl\b', 'six-cylinder', e); e = re.sub(r'(?i)\b4 cyl\b', 'four-cylinder', e)
    for w in ('Hybrid', 'HYBRID', 'Turbo', 'Boxer', 'Twin-Turbo'): e = e.replace(w, w.lower())
    return re.sub(r'\s+', ' ', e).strip()
def tidy_trans(t):
    if not t: return None, None
    l = t.lower()
    kind = 'Manual' if 'manual' in l else 'Automatic'
    m = re.search(r'(\d+)', l)
    if 'cvt' in l or 'continuous' in l: out = 'e-CVT' if 'ecvt' in l else 'CVT'
    elif 'dct' in l or 'dual' in l: out = f'{m.group(1)}-speed dual-clutch'
    elif m: out = f"{m.group(1)}-speed {'manual' if kind == 'Manual' else 'automatic'}"
    else: out = kind
    return out, kind
def cap(c):
    if not c: return c
    c = c.replace('metalic', 'metallic').replace('Metalic', 'metallic')
    return c[0].upper() + c[1:]
def slugify(s): return re.sub(r'-+', '-', re.sub(r'[^a-z0-9]+', '-', s.lower())).strip('-')
def photo_file(u): return u.split('/uploads/')[1].replace('/', '_')
YARD = ('DEALERSHIP-PHOTO', 'SITE-PHOTO')
ANGLES_AVAIL = ['front three-quarter', 'front', 'rear three-quarter', 'rear', 'interior']
def angle(fn, i, soon):
    b = fn.rsplit('_', 1)[-1].upper()
    for k, v in (('FR', 'front three-quarter, right side'), ('FL', 'front three-quarter, left side'), ('INT', 'interior'), ('RL', 'rear three-quarter, left side'), ('RR', 'rear three-quarter, right side')):
        if b.startswith(k): return v
    return ANGLES_AVAIL[i] if (not soon and i < 5) else None

cars, seen = [], {}
for r in src:
    s = r['specs']; no = s.get('stock-number')
    if no not in T: print('NO TABLE ROW', no, r['title']); sys.exit(1)
    model, code, grade, body, o = T[no]
    soon = r['inSoon']
    uc = (r['badge'] or '').upper() == 'UNDER CONTRACT'
    status = 'coming-soon' if soon else ('under-contract' if uc else 'available')
    make = MAKE.get(s['make'], s['make'])
    km = s.get('mileage'); km = int(re.sub(r'\D', '', km)) if km and re.search(r'\d', km) else None
    tr, kind = tidy_trans(o.get('transmission') or s.get('transmission'))
    if 'transmission' in o: tr = o['transmission']; kind = 'Manual' if 'manual' in tr.lower() else 'Automatic'
    if not s.get('transmission') and 'transmission' not in o:
        tl = r['title'].lower(); kind = 'Manual' if 'manual' in tl else ('Automatic' if 'auto' in tl else None); tr = kind
    ov = [p for p in r['overview'] if not any(b in p[:40] for b in BOILER)]
    hl = []
    for p in ov:
        m = re.match(r'^\*\*\s*(.+?)\s*\*\*$', p)
        if m: hl += [x.strip() for x in re.split(r'\s[–-]\s', m.group(1)) if x.strip()]
    sh = None
    for p_ in ov:
        if len(p_) > 400: continue
        m_ = re.search(r'(FULL SERVICE HISTORY|FULL HISTORY|SERVICE HISTORY)', p_)
        if m_: sh = m_.group(1); break
    engno = next((re.sub(r'^ENGINE #\s*', '', p).strip() for p in ov if p.startswith('ENGINE #')), None)
    if no == '1433': engno = None
    photos = []
    for i, u in enumerate(x for x in r['images'] if not any(y in x for y in YARD)):
        fn = photo_file(u); photos.append({'src': u, 'file': fn, 'angle': angle(fn.rsplit('.', 1)[0], i, soon)})
    vin = s.get('vin-number')
    slug = slugify(f"{s['year']} {make} {model} {code or ''} {grade or ''}")[:70].strip('-') + '-' + no
    title_clean = ' '.join(x for x in [s['year'], make, model, grade] if x)
    car = {
      'id': no, 'slug': slug, 'status': status,
      'badge': r['badge'] if r['badge'] in ('Just Arrived', 'Just Traded') else None,
      'title': title_clean, 'titleAsListed': r['title'].replace('\xa0', ' '),
      'year': int(s['year']), 'make': make, 'model': model, 'modelCode': code, 'grade': grade, 'gradeNeedsConfirming': bool(o.get('gradeGap')),
      'body': body, 'bodyAsListed': s.get('body-style'), 'seats': o.get('seats'),
      'km': km, 'price': r['price'], 'priceNote': r['taxnote'],
      'transmission': tr, 'transmissionType': kind,
      'drivetrain': o['drivetrain'] if 'drivetrain' in o else s.get('drivetrain'),
      'engine': o['engine'] if 'engine' in o else tidy_engine(s.get('engine')),
      'colour': cap(s.get('exterior-color')), 'interiorColour': cap(s.get('interior-color')),
      'vin': vin, 'vinType': ('Japanese frame number' if soon and vin and '-' in vin else 'VIN') if vin else None,
      'engineNumber': engno, 'location': s.get('location'),
      'highlights': hl, 'published': {
        'auctionGrade': None, 'serviceHistory': sh,
        'australianDelivered': any('AUSTRALIAN DELIVERED' in h.upper() for h in hl),
        'expectedArrival': None },
      'photos': photos, 'sourceUrl': r['url'], 'sourceModified': r['modified'], 'notes': o.get('note'),
    }
    cars.append(car)
order = {'available': 0, 'under-contract': 1, 'coming-soon': 2}
cars.sort(key=lambda c: (order[c['status']], -c['year'], c['make'], c['model']))
out = {'source': 'https://www.tokyoprestige.com.au', 'capturedAt': '2026-11-11', 'note': 'Demo data captured from the public site. In production this file is replaced by the dealer management system feed.',
       'dealer': {'name': 'Tokyo Prestige', 'licence': 'MVD 287394', 'phone': '08 8336 4674', 'email': 'sales@tokyoprestige.com.au', 'address': '216-218 Kensington Road, Marryatville SA 5068'},
       'cars': cars}
json.dump(out, open(os.path.join(ROOT, 'data/stock.json'), 'w'), indent=1, ensure_ascii=False)
import collections
print(len(cars), collections.Counter(c['status'] for c in cars), collections.Counter(c['body'] for c in cars))
print(collections.Counter(c['transmission'] for c in cars)); print(collections.Counter(c['drivetrain'] for c in cars)); print(sorted(set(c['engine'] or '-' for c in cars)))
print(sum(len(c['photos']) for c in cars), collections.Counter(p['angle'] for c in cars for p in c['photos']))
print(len(set(c['slug'] for c in cars)), [c['highlights'] for c in cars if c['highlights']][:6])
