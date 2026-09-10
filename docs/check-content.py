"""Compare the supplied Word paragraphs and table with website copy.

Usage: python docs/check-content.py path/to/client.docx
The report distinguishes textual matches from entries needing editorial review.
"""
from pathlib import Path
from bs4 import BeautifulSoup
import json
import re
import sys
import xml.etree.ElementTree as ET
from zipfile import ZipFile

ROOT = Path(__file__).resolve().parents[1]
NS = {'w': 'http://schemas.openxmlformats.org/wordprocessingml/2006/main'}
with ZipFile(sys.argv[1]) as archive:
    tree = ET.fromstring(archive.read('word/document.xml'))
paragraphs = [''.join(t.text or '' for t in p.findall('.//w:t', NS))
              for p in tree.findall('w:body/w:p', NS)]

def normalize(text):
    return re.sub(r'[^a-z0-9%]+', '', text.lower())

pages = {}
for path in ROOT.glob('*.html'):
    soup = BeautifulSoup(path.read_text(encoding='utf-8'), 'html.parser')
    # Template text becomes visible in the product specification dialogs.
    for template in soup.find_all('template'):
        template.replace_with(BeautifulSoup(template.decode_contents(), 'html.parser'))
    pages[path.name] = normalize(soup.get_text(' ', strip=True))
pages['shared footer'] = normalize((ROOT / 'js/components.js').read_text(encoding='utf-8'))

results = []
for index, text in enumerate(paragraphs):
    if index < 42 or not text.strip():
        continue
    matches = [name for name, page in pages.items() if normalize(text) in page]
    results.append({'paragraph': index, 'source': text, 'pages': matches,
                    'status': 'Text matches after case/punctuation normalization' if matches else 'Review: heading, instruction, split copy, or wording difference'})

tables = []
for table in tree.findall('w:body/w:tbl', NS):
    cells = [''.join(t.text or '' for t in cell.findall('.//w:t', NS))
             for cell in table.findall('.//w:tc', NS)]
    tables.append({'source_cells': cells, 'all_cells_present': all(normalize(c) in pages['product-detail.html'] for c in cells)})

report = {'source': Path(sys.argv[1]).name, 'normalization': 'Case, spacing, and punctuation ignored; not a word-for-word certification.', 'paragraphs': results, 'tables': tables}
(ROOT / 'docs/word-content-audit.json').write_text(json.dumps(report, ensure_ascii=False, indent=2), encoding='utf-8')
print(json.dumps({'paragraphs': len(results), 'matched': sum(bool(r['pages']) for r in results), 'tables': tables}, ensure_ascii=True))
