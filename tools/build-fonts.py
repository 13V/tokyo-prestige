#!/usr/bin/env python3
"""Fetches the small Japanese font subset: only the characters the built pages use.
Run after tools/build.mjs when Japanese text changes. Needs network access to Google Fonts."""
import glob, os, re, subprocess, urllib.parse
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
chars = set()
for f in glob.glob(ROOT + '/*.html') + glob.glob(ROOT + '/cars/*.html') + glob.glob(ROOT + '/tools/**/*.mjs', recursive=True):
    chars |= set(re.findall(r'[　-ヿ一-鿿＀-￯]', open(f, encoding='utf8').read()))
text = ''.join(sorted(chars))
UA = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36'
css = subprocess.run(['curl', '-sS', '-A', UA, 'https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500&text=' + urllib.parse.quote(text)], capture_output=True, text=True).stdout
url = re.search(r'url\((https://[^)]+)\)', css).group(1)
subprocess.run(['curl', '-sS', '-o', ROOT + '/fonts/noto-jp-subset.woff2', url], check=True)
print(len(text), 'characters:', text, os.path.getsize(ROOT + '/fonts/noto-jp-subset.woff2'), 'bytes')
