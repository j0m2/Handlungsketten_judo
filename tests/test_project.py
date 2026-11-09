"""Data integrity checks for the offline Judo technique graph."""
import json
import subprocess
import sys
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DATA = json.loads((ROOT / 'data/project-data.json').read_text(encoding='utf-8'))
BUILD_INFO = json.loads((ROOT / 'data/build-info.json').read_text(encoding='utf-8'))
SOURCE_CATALOG = DATA['sourceCatalog']
EVIDENCE_LEVELS = {'direct-video-chapter', 'direct-video-description'}

class ProjectTests(unittest.TestCase):
    def setUp(self):
        self.nodes = {n['id']: n for n in DATA['nodes']}
        self.edge_pairs = {(e['a'],e['b']) for e in DATA['edges']}

    def test_expected_categories_and_start_points(self):
        from collections import Counter
        counts = Counter(n['group'] for n in DATA['nodes'])
        self.assertEqual(counts['start'], 8)
        self.assertEqual(counts['hold'], 10)
        self.assertEqual(counts['lever'], 10)
        self.assertEqual(counts['choke'], 12)
        self.assertNotIn('s2', self.nodes) # Removed Tori-in-Oberlage start point.
        self.assertIn('Mount (BJJ)', self.nodes['h7']['aliases'])

    def test_node_ids_unique(self):
        self.assertEqual(len(self.nodes), len(DATA['nodes']))
        self.assertTrue(all(n['name'] and isinstance(n['aliases'], list) for n in DATA['nodes']))

    def test_edges_reference_existing_nodes(self):
        self.assertEqual(len(self.edge_pairs), len(DATA['edges']))
        for edge in DATA['edges']:
            with self.subTest(edge=(edge['a'],edge['b'])):
                self.assertIn(edge['a'], self.nodes)
                self.assertIn(edge['b'], self.nodes)
                self.assertNotEqual(edge['a'],edge['b'])
                self.assertIsInstance(edge['uncertain'],bool)
                self.assertIsInstance(edge['note'],str)
                self.assertTrue(edge['note'].strip())

    def test_example_chains_connect_directed_edges(self):
        chain_ids = [c['id'] for c in DATA['chains']]
        self.assertEqual(len(set(chain_ids)),len(chain_ids))
        for chain in DATA['chains']:
            with self.subTest(chain=chain['id']):
                self.assertEqual(self.nodes[chain['start']]['group'],'start')
                self.assertGreaterEqual(len(chain['tech']),3)
                self.assertEqual(len(set(chain['tech'])),len(chain['tech']))
                seq = [chain['start'],*chain['tech']]
                for a,b in zip(seq,seq[1:]):
                    self.assertIn((a,b),self.edge_pairs)

    def test_methods_reference_existing_starts_targets_sources(self):
        self.assertGreater(len(DATA['methods']),0)
        for method in DATA['methods']:
            with self.subTest(method=method['name']):
                self.assertEqual(self.nodes[method['start']]['group'],'start')
                if method['target']:
                    self.assertIn(method['target'],self.nodes)
                self.assertTrue(method['description'].strip())
                self.assertIn(method['source'], DATA['sources'])

    def test_sources_have_http_urls(self):
        self.assertTrue(all(url.startswith(('https://','http://')) for url in DATA['sources'].values()))

    def test_source_catalog_and_edge_evidence(self):
        self.assertGreaterEqual(len(SOURCE_CATALOG), 13)
        for source_id, source in SOURCE_CATALOG.items():
            with self.subTest(source_id=source_id):
                self.assertTrue(source_id)
                self.assertIn(source['label'], DATA['sources'])
                self.assertEqual(source['url'], DATA['sources'][source['label']])
                self.assertTrue(source['publisher'].strip())
                self.assertIn(source['reviewStatus'], {'context-only', 'direct-transition'})
                self.assertTrue(source['notes'].strip())
        annotated_edges = [edge for edge in DATA['edges'] if 'evidence' in edge]
        self.assertGreaterEqual(len(annotated_edges), 11)
        for edge in annotated_edges:
            with self.subTest(edge=(edge['a'], edge['b'])):
                self.assertTrue(edge['evidence'])
                for evidence in edge['evidence']:
                    self.assertIn(evidence['sourceId'], SOURCE_CATALOG)
                    self.assertTrue(evidence['locator'].strip())
                    self.assertIn(evidence['evidenceLevel'], EVIDENCE_LEVELS)
                    self.assertRegex(evidence['reviewedAt'], r'^\d{4}-\d{2}-\d{2}$')
        self.assertIn(('s6', 'k3'), self.edge_pairs)
        self.assertIn(('s7', 'k0'), self.edge_pairs)

    def test_build_info_is_present(self):
        self.assertTrue(BUILD_INFO['version'].strip())
        self.assertTrue(BUILD_INFO['buildDate'].strip())

    def test_build_matches_committed_index(self):
        p=subprocess.run([sys.executable,str(ROOT/'scripts/build.py'),'--check'],cwd=ROOT,capture_output=True,text=True)
        self.assertEqual(p.returncode,0,p.stdout+'\n'+p.stderr)

if __name__ == '__main__':
    unittest.main()
