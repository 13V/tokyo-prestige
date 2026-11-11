#!/usr/bin/env python3
"""Turns the dealer's original photos into responsive AVIF files under img/cars/<stock no>/.
Usage: python3 tools/build-images.py <folder of downloaded originals>
Writes img/manifest.json (width, height and sizes per photo); build-site reads it."""
import json, os, sys
from multiprocessing import Pool
from PIL import Image, ImageOps
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = sys.argv[1]
def work(job):
    no, i, fn = job
    out = os.path.join(ROOT, 'img/cars', no); os.makedirs(out, exist_ok=True)
    im = ImageOps.exif_transpose(Image.open(os.path.join(SRC, fn))).convert('RGB')
    sizes = [w for w in (480, 960, 1600) if w <= im.width] or [im.width]
    if im.width < 1600 and im.width not in sizes and im.width > 960: sizes.append(im.width)
    for w in sizes:
        p = os.path.join(out, f'{i+1}-{w}.avif')
        if not os.path.exists(p):
            im.resize((w, round(w * im.height / im.width)), Image.LANCZOS).save(p, quality=50 if w > 480 else 54, speed=8)
    return (no, i, {'w': im.width, 'h': im.height, 'sizes': sizes})
if __name__ == '__main__':
    stock = json.load(open(os.path.join(ROOT, 'data/stock.json')))
    jobs = [(c['id'], i, p['file']) for c in stock['cars'] for i, p in enumerate(c['photos'])]
    man = {}
    with Pool(4) as pool:
        for no, i, meta in pool.imap_unordered(work, jobs, chunksize=4): man.setdefault(no, {})[str(i + 1)] = meta
    json.dump(man, open(os.path.join(ROOT, 'img/manifest.json'), 'w'), indent=0, sort_keys=True)
    print('done', len(jobs))
