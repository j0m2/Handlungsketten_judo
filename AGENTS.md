# AGENTS.md — Codex-Projektanweisungen

## Ziel

Pflege und erweitere die statische, interaktive Judo-Bodentechniknetz-Webanwendung, ohne die Offline-Nutzung oder bestehende Datensätze zu verlieren.

## Ausgangszustand

- Die ursprüngliche funktionsfähige Anwendung liegt als `index.html` vor.
- Der **autoritative Entwicklungsstand** liegt in `src/page.template.html`, `src/styles.css`, `src/app.js`, `data/project-data.json`.
- `index.html` ist ein **Build-Artefakt**, aber im Repository versioniert, weil GitHub Pages daraus direkt veröffentlicht.
- Die beiden Einstiegslagen `Uke in Beinschere` (Bottom Full/Closed Guard) und `Uke in Beinklammer` (Bottom Half Guard) sind als Startpositionen enthalten. `Tori in Oberlage` wurde explizit entfernt.
- Der Bereich „Ergänzte Ketten aus Full Guard und Half Guard“ und der Filter „Nur neue Full-/Half-Guard-Verbindungen“ sollen **nicht** wieder eingeführt werden.
- Tate-shiho-gatame trägt `Mount` als BJJ-Alias.

## Arbeitsablauf

1. README und `docs/CODEX_HANDOFF.md` lesen.
2. Daten in `data/project-data.json` aktualisieren, UI/Logik unter `src/` bearbeiten.
3. `python3 scripts/build.py` ausführen.
4. `python3 -m unittest discover -s tests -v` ausführen.
5. Im Browser `index.html` testen, einschließlich Offline-Modus, Ketteneditor und Export/Import.
6. Dokumentation aktualisieren, wenn sich Bedienung/Datenformat ändern.

## Nicht verhandelbare Invarianten

- **Keine externen Laufzeit-Abhängigkeiten** für die Benutzerseite. Die gebaute `index.html` muss allein offline funktionieren.
- Knoten-IDs stabil halten; bei Umbenennungen eine Migrationsstrategie für gespeicherte Ketten vorsehen.
- Ein Übergang ist gerichtet (`a` → `b`). Gegenrichtung nicht automatisch anlegen.
- Doppelte gerichtete Kanten vermeiden; jedes Ziel muss ein vorhandener Knoten sein.
- Unsichere Zuordnungen als `uncertain` markieren und fachlich nicht gesicherte Abläufe nicht als bewiesen darstellen.
- Jede neue Kante bekommt eine informative, kurze `note`; bei unbekannter Abwehr nicht spekulieren.
- Beispielketten bestehen aus gültigen gerichteten Kanten und mindestens drei **verschiedenen** Techniken.
- Beibehaltung aller drei Technikklassen (hold, lever, choke) und relevanter Querübergänge/Zyklen.
- Benannte Umdrehtechniken (`methods`) sind von den 32 Kodokan-Haupttechniken getrennt.
- Existierende private Ketten im localStorage nicht durch unbedachte Änderung des Storage-Keys verlieren (`judo_offline_saved_chains_v2`).
- Vorhandene Ketten-Exporte müssen soweit möglich weiter importierbar bleiben.

## Vorsicht

- BJJ-Bezeichnungen nicht ungeprüft einem offiziellen Judo-Techniknamen gleichsetzen (z. B. Kata-gatame als Haltegriff vs. Arm Triangle als Würger; Uki-gatame vs. Knee-on-belly).
- Quellenlinks müssen vor fachlichen Aussagen nachgeprüft werden. In den aktuellen Daten fehlen Quellenbelege auf **Einzelkantenebene**: wenn ergänzt, strukturiertes Feld mit Provenienz vorsehen.
- Nicht ohne Auftrag eine Lizenz, Datenerhebung, Backend-Dienste oder Benutzerkonten ergänzen.
- Öffentliche Vorschläge nicht als Wettkampfrechtsberatung darstellen; DJB-Regeln und Altersbeschränkungen prüfen.
