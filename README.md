# Judo-Bodentechniknetz

Interaktive, statische Webanwendung für die Recherche und Planung von Technikfolgen im Judo mit zusätzlichen Übergängen aus dem BJJ.

## Funktionen

- Acht Startpositionen, darunter Banklage (Turtle), Bauchlage, Full Guard und Half Guard.
- 32 offizielle Kodokan-Bodentechniken (Haltegriffe, Hebel und Würgegriffe).
- Gerichtete Übergänge mit knappen Erklärungen sowie Querverbindungen und Kreisen.
- Suche, Filter, Zoom und hervorgehobene Technikfolgen.
- Eigene Technikfolgen erstellen, bearbeiten, im Browser speichern und als JSON beziehungsweise Offline-HTML exportieren.
- Vollständig ohne externe JavaScript-Bibliotheken, Fonts, APIs oder Build-Schritt lauffähig.

**Achtung:** Das Netz ist eine Recherche- und Trainingsplanungshilfe. Nicht alle zusammengesetzten Ketten sind als Gesamtablauf praktisch verifiziert. Einzelne Verbindungen und die Zuordnung einiger BJJ-Namen sind als unsicher gekennzeichnet. Wettkampf- und Altersregeln beachten. Hebel und Würgegriffe nur unter fachkundiger Anleitung trainieren.

## Offline verwenden

`index.html` kann auch direkt im Browser ohne Internet geöffnet werden. Außerdem bietet die Anwendung eine Exportfunktion für eine Offline-HTML-Datei mit den selbst erstellten Technikfolgen.

## Speicherung und Datenschutz

Selbst angelegte Ketten werden im **Local Storage des jeweiligen Browsers** gespeichert. Die öffentliche GitHub-Pages-Seite ist **kein gemeinsam genutzter Speicher**: Andere Besucher sehen deine lokal gespeicherten Ketten nicht und Änderungen erscheinen nicht automatisch im Repository. Verwende den JSON-Export/-Import oder eine exportierte Offline-HTML-Datei für Backups und Gerätewechsel. Löschen von Browserdaten kann lokal gespeicherte Ketten entfernen.

Die Anwendung lädt keine externen Bibliotheken nach und enthält keine eigene Nutzeranmeldung oder serverseitige Datenbank. Quellenlinks zu externen Webseiten werden erst beim Anklicken geöffnet.
