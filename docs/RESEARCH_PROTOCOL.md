# Rechercheprotokoll: Übergänge im Ne-waza, Korpus v1

Stand: 09.11.2026

## Ziel und Abgrenzung

Das offene Internet lässt keine belastbare Quote über „alle einschlägigen“ Seiten oder Kanäle zu. Für diese Ausbaurunde ist deshalb ein endlicher Korpus festgelegt worden. Die Abdeckung ist messbar: **13 von 13 Quellen (100 %) wurden ausgewertet**. Das ist keine Aussage über den Anteil aller weltweit verfügbaren Judo- oder BJJ-Inhalte.

Die Recherche kombiniert offizielle Judoquellen zur Terminologie und zum Lehrkontext mit Videos, deren Titel, Beschreibung oder Zeitkapitel einen konkreten Übergang ausdrücklich nennen. Es wurden keine Kanten allein aus ähnlichen BJJ-Bezeichnungen oder allgemeinen Techniklisten abgeleitet.

## Suchstrategie

1. Offizielle Quellen von Kodokan, DJB und Judo-Verband Berlin wurden mit Kombinationen aus `Ne-waza`, `Bankposition`, `Bauchlage`, `Haltegriff`, `Armhebel` und `Übergang` gesucht.
2. Für vorhandene und denkbare gerichtete Kanten wurden englische und japanische Techniknamen mit gezielten YouTube-Abfragen kombiniert, zum Beispiel `Kesa Gatame to Ude Garami`, `Juji Gatame Into Sankaku Jime` und `Turtle to Ude Garami Judo`.
3. Ein Video galt nur dann als direkter Nachweis, wenn Titel, Beschreibung oder ein Zeitkapitel den Ausgang und das Ziel ausdrücklich benennen. Ohne bildweise Analyse wird die Evidenz entsprechend als Beschreibung beziehungsweise Kapitel, nicht als technische Vollverifikation, gespeichert.
4. Nicht eindeutige Zuordnungen – insbesondere No-Gi-Varianten oder BJJ-/Kodokan-Namensgleichheiten – bleiben `uncertain`.

## Vollständig ausgewerteter Korpus

| Kategorie | Quelle | Ergebnis |
| --- | --- | --- |
| Offiziell | DJB – Kyu-Grundprogramm Boden (2024) | Lehrkontext, keine gerichtete Einzelkante |
| Offiziell | DJB – Rahmentrainingskonzeption | Lehrkontext, keine gerichtete Einzelkante |
| Offiziell | JVB – Ne-waza-Übersicht | Terminologie, keine gerichtete Einzelkante |
| Offiziell | Kodokan – Definitions of Judo Techniques (2022) | Terminologie, keine gerichtete Einzelkante |
| Verband | JVB – Ne-waza-Lehrgang mit Detlef Ultsch | allgemeine Kette Bank → Haltegriff → Juji, kein genauer Haltegriff |
| Video | Kaze Uta: Closed Guard → Ude-garami | bestehende Kante belegt |
| Video | Dojo System: Closed-Guard-Submissions | vier bestehende und eine neue Closed-Guard-Kante belegt |
| Video | Welcome Mat: Kesa-gatame → Ude-garami | bestehende Kante belegt |
| Video | Judo Advantage: Kami-shiho-gatame → Ude-garami | bestehende Kante belegt |
| Video | Karl Richard Frey: Juji-gatame → Sankaku-jime | bestehende Kante belegt |
| Video | Modesto Judo Club: Turtle → Ude-garami | neue, als unsicher markierte Kante |
| Video | Honmoku Judo Club: Turtle → Sankaku-jime | bestehende, weiterhin unsichere Kante belegt |
| Video | Sampson Judo: Turtle → Okuri-eri-jime | bestehende Kante belegt |

## Ergebnis

Neu aufgenommen wurden:

- `s6 → k3`: Bottom Full Guard → Ude-hishigi-hiza-gatame, mit `uncertain: true`, weil die Quelle eine Judo-/BJJ-Variante dokumentiert.
- `s7 → k0`: Turtle → Ude-garami, mit `uncertain: true`, weil die Quelle eine No-Gi-Variante nennt.

Zusätzlich erhielten neun bereits vorhandene Kanten strukturierte Nachweise. Alle Nachweise stehen in `edges[].evidence[]`; vollständige Metadaten und Grenzen der Quellen im `sourceCatalog` von `data/project-data.json`.

## Fortsetzung

Die nächste Runde sollte einen weiteren, vorab festgelegten Korpus behandeln, etwa ausschließlich offizielle Landesverbands-Lehrmaterialien oder eine getrennte, bildweise geprüfte Videostichprobe. Quellen ohne exakte Kantenbezeichnung bleiben dabei Kontext und erzeugen keine neue Kante.
