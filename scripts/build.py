#!/usr/bin/env python3
"""Build a fully self-contained index.html from the editable source tree.

Run: python3 scripts/build.py
Check if up-to-date (CI): python3 scripts/build.py --check
No third-party Python packages required.
"""
import argparse
from html import escape
import json
from pathlib import Path
import sys

ROOT = Path(__file__).resolve().parents[1]
CSS_TOKEN = '__JUDO_INLINE_CSS__'
JS_TOKEN = '__JUDO_INLINE_JS__'
DATA_TOKEN = '__JUDO_DATA_JSON__'
VERSION_TOKEN = '__APP_VERSION__'
BUILD_DATE_TOKEN = '__BUILD_DATE__'
BUILD_INFO_PATH = ROOT / 'data/build-info.json'


def read_build_info():
    try:
        build_info = json.loads(BUILD_INFO_PATH.read_text(encoding='utf-8'))
    except FileNotFoundError as exc:
        raise ValueError(f'Build metadata missing: {BUILD_INFO_PATH}') from exc
    if not isinstance(build_info, dict):
        raise ValueError('Build metadata must be a JSON object')
    for key in ('version', 'buildDate'):
        if not isinstance(build_info.get(key), str) or not build_info[key].strip():
            raise ValueError(f'Build metadata needs a non-empty string field: {key}')
    return build_info


def write_build_info(build_info):
    BUILD_INFO_PATH.write_text(
        json.dumps(build_info, ensure_ascii=False, indent=2) + '\n', encoding='utf-8'
    )


def render(build_info):
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
    for token, content in [
        (VERSION_TOKEN, escape(build_info['version'], quote=True)),
        (BUILD_DATE_TOKEN, escape(build_info['buildDate'], quote=True)),
    ]:
        if page.count(token) < 1:
            raise ValueError(f'Build metadata placeholder not found: {token}')
        page = page.replace(token, content)
    if page.count(JS_TOKEN) != 1:
        raise ValueError('JS placeholder not found exactly once')
    return page.replace(JS_TOKEN, js)


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--check', action='store_true', help='Fail if index.html needs rebuilding')
    parser.add_argument('--version', help='Version label for this deployment build')
    parser.add_argument('--build-date', help='Human-readable date for this deployment build')
    args = parser.parse_args()
    if bool(args.version) != bool(args.build_date):
        parser.error('--version and --build-date must be passed together')
    if args.check and args.version:
        parser.error('--check cannot be combined with deployment metadata')
    build_info = (
        {'version': args.version, 'buildDate': args.build_date}
        if args.version else read_build_info()
    )
    result = render(build_info)
    target = ROOT / 'index.html'
    if args.check:
        if not target.exists() or target.read_text(encoding='utf-8') != result:
            print('index.html is out of date; run: python3 scripts/build.py', file=sys.stderr)
            return 1
        print('index.html is up to date')
        return 0
    target.write_text(result, encoding='utf-8')
    if args.version:
        write_build_info(build_info)
    print(f'Built {target} ({len(result.encode("utf-8")):,} bytes)')
    return 0

if __name__ == '__main__':
    raise SystemExit(main())
