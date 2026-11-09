#!/usr/bin/env python3
"""Build a fully self-contained index.html from the editable source tree.

Run: python3 scripts/build.py
Check if up-to-date (CI): python3 scripts/build.py --check
No third-party Python packages required.
"""
import argparse
import json
from pathlib import Path
import sys

ROOT = Path(__file__).resolve().parents[1]
CSS_TOKEN = '__JUDO_INLINE_CSS__'
JS_TOKEN = '__JUDO_INLINE_JS__'
DATA_TOKEN = '__JUDO_DATA_JSON__'


def render():
    page = (ROOT / 'src/page.template.html').read_text(encoding='utf-8')
    css = (ROOT / 'src/styles.css').read_text(encoding='utf-8')
    js = (ROOT / 'src/app.js').read_text(encoding='utf-8')
    data = json.loads((ROOT / 'data/project-data.json').read_text(encoding='utf-8'))
    # Do not allow a JSON string to accidentally close the containing script tag.
    compact = json.dumps(data, ensure_ascii=False, separators=(',', ':')).replace('</', r'<\/')
    for token, content in [(CSS_TOKEN, css), (DATA_TOKEN, compact)]:
        if token == CSS_TOKEN:
            if page.count(token) != 1:
                raise ValueError('CSS placeholder not found exactly once')
            page = page.replace(token, content)
        else:
            if js.count(token) != 1:
                raise ValueError('Data placeholder not found exactly once')
            js = js.replace(token, content)
    if page.count(JS_TOKEN) != 1:
        raise ValueError('JS placeholder not found exactly once')
    return page.replace(JS_TOKEN, js)


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--check', action='store_true', help='Fail if index.html needs rebuilding')
    args = parser.parse_args()
    result = render()
    target = ROOT / 'index.html'
    if args.check:
        if not target.exists() or target.read_text(encoding='utf-8') != result:
            print('index.html is out of date; run: python3 scripts/build.py', file=sys.stderr)
            return 1
        print('index.html is up to date')
        return 0
    target.write_text(result, encoding='utf-8')
    print(f'Built {target} ({len(result.encode("utf-8")):,} bytes)')
    return 0

if __name__ == '__main__':
    raise SystemExit(main())
