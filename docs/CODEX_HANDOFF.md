# Codex-Handover: Projektstand und Weiterentwicklung

## Kurzüberblick

Der Nutzer hat ein interaktives Judo/BJJ-Bodentechniknetz aus einer umfangreichen Recherche aufgebaut. Das Projekt zeigt **gerichtete Übergänge** von Technik A nach B, inklusive kurzer Beschreibung, Einstiegspositionen und Kreise. Nutzer können aus vorhandenen Verbindungen eigene Ketten zusammenstellen und lokal speichern sowie JSON/Offline-HTML exportieren. Ziel: GitHub Pages, Bearbeitung in Codex.

## Bisherige Anforderungen (beibehalten)

1. 32 Kodokan-Haupttechniken: 10 Osaekomi-waza, 10 Kansetsu-waza, 12 Shime-waza, getrennte Kategorien.
2. Historische/Judo-/BJJ-Varianten als Aliasse bei der jeweiligen Technik; Unsicherheiten markieren.
3. Technikübergänge aller Richtungen: Halten ↔ Hebeln ↔ Würgen sowie intra-kategorial; gerichtete Kanten; Kreise möglich.
4. Acht Startpositionen: Wurf ohne volle Wertung, gescheiterter Angriff von Tori, Uke in Bank (Turtle), Uke in Bauchlage, Top Half Guard, Top Closed Guard, Bottom Half Guard, Bottom Full Guard.
5. **Nicht wieder einführen:** „Tori in Oberlage“ als Startpunkt. Separate Full-/Half-Guard-Ergänzungsliste wurde entfernt. Filter „Nur neue Full-/Half-Guard-Verbindungen“ wurde entfernt.
6. Tate-shiho-gatame = Mount als BJJ-Alias (genaue Haltegriffausführung prüfen).
7. Benannte Einstiegs-/Umdrehtechniken gegen Bank und Bauchlage: z. B. Stützeklauen, Sattelsturz, Iatskevich-/Adams-Juji-Rolle, Rollbankwürger, Briggs-Sankaku, Halbnelson, Schlüsseldreher. `methods[]` enthält die aktuell gespeicherten Namen und Ziele.
8. Jede gerichtete Kante erhält kurze Erklärung, warum der Wechsel möglich ist; Unklarheiten kennzeichnen.
9. Ketten sollen mindestens drei Haupttechniken enthalten; erneute Technik im selben Pfad soll als Kreis erkannt und nicht doppelt eingebaut werden.
10. Eigenen Ketteneditor samt Speichern, Laden und JSON-/Offline-HTML-Export erhalten.
11. Rein statische, mobil nutzbare, offline lauffähige Website.

## Aktueller realer Datensatz

- 8 Einstiege, 32 Haupttechniken, 164 gerichtete Kanten, 39 benannte Einstiegsmethoden, 30 Beispielketten und 34 Quellen-URLs.
- 13 neu geprüfte Quellen sind zusätzlich in `sourceCatalog` mit Herausgeber, Typ, Prüfdatum und Reichweite erfasst; 11 Kanten tragen direkte Videonachweise.
- Techniken und Aliasse in `data/project-data.json`.
- Quelle der historischen Lehrmethoden ist das bestehende Rechercheprojekt; keine vollständige erneute externe Verifikation in diesem Export.
- Achtung: Ein „aus Quellen abgeleiteter“ Einzelübergang ist **nicht** gleichzusetzen mit einer praktisch erprobten langen Kette.

## Codex-Startprompt (direkt kopierbar)

> Arbeite in diesem Repository weiter. Lies AGENTS.md und docs/CODEX_HANDOFF.md. Die Website ist eine eigenständige GitHub-Pages-App mit graphbasiertem Judo-Bodentechniknetz. Halte Offline-Funktion, alle Knoten und Kanten, Ketteneditor, LocalStorage und Export/Import funktionsfähig. Nutze data/project-data.json als Single Source of Truth für die Inhalte, src/ für Code und scripts/build.py für die index.html. Führe vor Abschluss die Tests aus. Ändere Knoten-IDs nicht ohne Migration. Beginne mit einer Bestandsaufnahme, danach schlage konkrete nächste Verbesserungen vor.

## Mögliche nächste Verbesserungen

- **Fachliche Qualität:** die vorhandene Kanten-Provenienz (`edges[].evidence`) auf weitere Kanten ausweiten, insbesondere mit Positionsangaben (`positionFrom`, `positionTo`); historische/unsichere Zuordnungen verbessern.
- **Kettenlogik:** Positionskompatibilität der Übergänge prüfen; Ketten nach Einstieg und Technikgruppe suchen; Zyklen sichtbar kennzeichnen; automatische Vorschläge mit Abwehrreaktionen.
- **UI:** SVG-Layout bei 162+ Kanten entwirren, bessere Touch-Bedienung, Werkzeugleiste für Pfade, farbige Richtungsfilter und selektive Kantenanzeige.
- **Datenpflege:** Editor für neue Techniken/Übergänge, Duplikatprüfung, Import/Export, Quellenpflege; JSON-Schema.
- **Qualität:** Browser-Tests (Playwright optional, nur als Entwicklungsabhängigkeit), Accessibility, Tastaturbedienung, Screenshots/visuelle Regression.
- **Versionierung:** Migration alter lokaler Ketten bei Namens-/ID-Änderungen.

## GitHub Pages

Push `index.html` (nach `python3 scripts/build.py`) zusammen mit dem Repository auf Branch `main`. GitHub Pages Quelle `main` / Root; `.nojekyll` vorhanden.

## Persönliche Ketten

Eine ZIP-Datei aus dem Projektordner kann **nicht** die Browser-LocalStorage-Ketten anderer Geräte enthalten. Nutzer müssen ihre tatsächlich gespeicherten Ketten separat über den JSON-Export sichern/importieren. In dieser Übergabe sind keine persönlichen Ketten enthalten.
