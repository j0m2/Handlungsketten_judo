# Datenmodell: `data/project-data.json`

Die Datei besteht aus einem JSON-Objekt mit sechs Top-Level-Feldern. Diese Datei ist der maßgebliche bearbeitbare Datenbestand für Codex.

## `nodes[]`

- `id` (string): dauerhafte eindeutige ID, z. B. `s7`, `h7`, `k1`, `w10`.
- `name` (string): angezeigter Name.
- `group`: `start`, `hold`, `lever` oder `choke`.
- `aliases` (string[]): Synonyme, historische Namen und BJJ-Namen, teils mit `(?)` für unsichere Gleichsetzungen.

**Namenspräfixe:** `s` Einstieg, `h` Haltegriff, `k` Hebel, `w` Würgegriff. Nicht alle Start-IDs sind fortlaufend, weil ein früherer Startpunkt entfernt wurde. IDs nicht neu durchnummerieren.

## `edges[]`

- `a` und `b`: Quell- und Zielknoten-ID. Richtung ist wesentlich.
- `uncertain`: boolescher Hinweis auf offene Zuordnungs-/Positionsfrage.
- `note`: kurze Beschreibung von Einstieg, Abwehr oder Wechsel.
- `added`: historisches Flag für nachträglich ergänzte Verbindungen. **Kein sicherer Quellen-/Zeitstempel.**

Doppelte (`a`,`b`)-Paare sind nicht erlaubt. Alle 166 aktuellen Kanten haben eine Notiz. Eine Gegenkante muss explizit angelegt werden.

## `methods[]`

- `start`: ID eines Einstiegsknotens.
- `name`: eigenständiger Name eines Judo-Angriffs/Umdrehers.
- `target`: Ziel-Technik-ID oder `null`, falls keine belastbar zugeordnete Zieltechnik vorliegt.
- `description`: vereinfachte Durchführung/Positionsidee.
- `source`: Label einer Quelle im Objekt `sources`.
- `uncertain`: boolesche Unsicherheit.

Diese Namen erscheinen **nicht** automatisch als zusätzliche Technik-Knoten. Sie sind Methoden, die zu einer der offiziellen Techniken führen können.

## `chains[]`

- `id`: beispielhafte Kettenbezeichnung (z. B. `F1`, `H1` usw.).
- `start`: Einstiegsknoten-ID.
- `tech`: geordnete Liste von mindestens drei unterschiedlichen **Technik-IDs**.
- `cue`: kurze Beschreibung des Prinzips.
- `sources`: Liste von Quellenlabels. Einzelne Links sind unter `sources` gespeichert.

Für jedes benachbarte Paar muss eine gerichtete Kante im Graphen existieren. Der Einstieg muss direkt zur ersten Technik führen.

## `sources{}`

String-Map `Quellenlabel: URL` aus bisheriger Recherche. Sie füllt die in der Website sichtbare Quellenliste.


## Persönliche gespeicherte Ketten

Das Format der selbst gespeicherten Ketten im LocalStorage/JSON-Export ist vom eingebauten `chains[]`-Format zu unterscheiden:

```json
{
  "id": "persoenliche-kennung",
  "start": "s6",
  "tech": ["w1", "k1", "w10"],
  "name": "Meine Full-Guard-Kette",
  "note": "Kragenwürger wird verteidigt",
  "savedAt": ""
}
```

Export kann aus einer Liste solcher Objekte bestehen. `data/custom-chains.example.json` ist absichtlich leer und enthält keine persönlichen Nutzerdaten.
