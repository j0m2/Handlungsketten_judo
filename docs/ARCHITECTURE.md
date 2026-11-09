# Architektur

## Status quo

Die Anwendung ist eine eigenständige HTML-Seite mit eingebettetem CSS und Vanilla-JavaScript; zum Anzeigen keine Abhängigkeiten von Bibliotheken, CDNs oder Web-APIs jenseits der Browser-Plattform. Veröffentlichungsziel: GitHub Pages; offline ist das Öffnen per `file://` möglich.

```text
judo-bodentechniknetz/
├── index.html                 # generiertes Deploy-Artefakt (offline funktionsfähig)
├── src/
│   ├── page.template.html     # HTML + Platzhalter für CSS und JS
│   ├── styles.css             # extrahierte Originalstyles
│   └── app.js                 # Original-JS mit DATA-Platzhalter
├── data/
│   ├── project-data.json      # vollständiger Technikgraph / Recherche-Daten
│   ├── build-info.json        # zuletzt erzeugte Versions- und Datumsangabe
│   └── custom-chains.example.json
├── scripts/build.py          # erzeugt index.html
├── Makefile                   # build/test/check/deploy-Abläufe
├── tests/test_project.py     # Datenintegrität und Build-Reproduzierbarkeit
├── docs/                     # Projekt- und Rechercheunterlagen
├── AGENTS.md                  # Arbeitsanweisungen für Codex
├── .github/workflows/validate.yml
└── .nojekyll
```

## Build

`scripts/build.py` liest das HTML-Template, bettet `styles.css` ein und ersetzt in `app.js` `__JUDO_DATA_JSON__` durch das kompakte JSON aus `data/project-data.json`. Version und Datum kommen aus `data/build-info.json`; `make deploy` setzt beide Werte neu. Danach bettet es den vollständigen JavaScript-Text in die Seite ein. `index.html` muss dadurch weiterhin **ein einziges portables Dokument** bleiben. Mit `--check` wird geprüft, ob sie zum Quellstand passt.

## Datenmodell

- `nodes`: 8 start + 10 hold + 10 lever + 12 choke
- `edges`: gerichtete, deduplizierte Übergänge mit Kurzbeschreibung
- `methods`: eigenständig benannte Umdreher/Angriffe aus Startpositionen, teilweise ohne sicheres Ziel (`target: null`)
- `chains`: Beispiele, deren IDs und Kantenfolge überprüft werden
- `sources`: Label → URL der bisherigen Recherche
- `sourceCatalog`: strukturierte Angaben zu neu geprüften Quellen; `edges[].evidence` verweist darauf

Siehe `docs/DATA_MODEL.md` für Felddefinitionen.

## Browserzustand

Gespeicherte individuelle Ketten: LocalStorage-Schlüssel `judo_offline_saved_chains_v2`. Beim Laden werden im HTML eingebettete gespeicherte Ketten und LocalStorage-Ketten abgeglichen. Der JSON-Export/-Import ermöglicht den Umzug auf andere Geräte. Ein HTML-Export enthält die eingebetteten Ketten. Daten sind nicht serverseitig gespeichert.

## Teststrategie

- JSON-Schema-Invarianten und Referenzen mit `unittest` prüfen.
- `scripts/build.py --check` als Schutz gegen veraltete `index.html`.
- Für UI-Anpassungen zusätzlich manuellen Browser-Test: Suche, Einstiegsfilter, Zoom/Pan, Kreis-/Querverbindungen, Ketteneditor, LocalStorage, JSON-Export/-Import und portable Offline-HTML.

## Bekannte Grenzen

- Darstellung vieler Verbindungen kann visuell dicht sein.
- Erst 11 von 164 Kanten haben einen strukturierten Einzelnachweis; die übrigen Kanten benötigen weiterhin Quellenprovenienz.
- Nicht jeder BJJ-Begriff ist eindeutig auf Kodokan-Nomenklatur abbildbar.
- Einige Ketten sind konzeptionell aus Einzelübergängen konstruiert, nicht praktisch als Ganzes validiert.
- Eine Änderung der Node-IDs kann bestehende private Benutzerketten ungültig machen.
