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

## In GitHub Pages veröffentlichen

1. Ein neues Repository auf GitHub erstellen, zum Beispiel `judo-bodentechniknetz`. Für GitHub Pages mit GitHub Free das Repository auf **Public** stellen.
2. Die Dateien aus diesem Paket **entpacken** und auf die oberste Ebene (Repository-Root) hochladen: `index.html`, `README.md`, `.nojekyll`.
   - Die Datei `.nojekyll` ist auf macOS wegen des führenden Punkts eventuell ausgeblendet. Sie ist für diese einzelne HTML-Seite nicht zwingend erforderlich.
3. Auf der Repository-Seite zu **Settings → Pages** gehen.
4. Unter **Build and deployment** bei **Source** den Wert **Deploy from a branch** auswählen.
5. **Branch: `main`**, **Folder: `/(root)`** einstellen und **Save** klicken.
6. Die Seite unter `https://DEIN-BENUTZERNAME.github.io/judo-bodentechniknetz/` öffnen. Bei anderem Repository-Namen verändert sich der Pfad entsprechend.

GitHub-Dokumentation: https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site

## Offline verwenden

`index.html` kann auch direkt im Browser ohne Internet geöffnet werden. Außerdem bietet die Anwendung eine Exportfunktion für eine Offline-HTML-Datei mit den selbst erstellten Technikfolgen.

## Speicherung und Datenschutz

Selbst angelegte Ketten werden im **Local Storage des jeweiligen Browsers** gespeichert. Die öffentliche GitHub-Pages-Seite ist **kein gemeinsam genutzter Speicher**: Andere Besucher sehen deine lokal gespeicherten Ketten nicht und Änderungen erscheinen nicht automatisch im Repository. Verwende den JSON-Export/-Import oder eine exportierte Offline-HTML-Datei für Backups und Gerätewechsel. Löschen von Browserdaten kann lokal gespeicherte Ketten entfernen.

Die Anwendung lädt keine externen Bibliotheken nach und enthält keine eigene Nutzeranmeldung oder serverseitige Datenbank. Quellenlinks zu externen Webseiten werden erst beim Anklicken geöffnet.

## Projektpflege

Die Website wird nach einem Commit auf `main` automatisch neu veröffentlicht. Der Einstiegspunkt ist `index.html`. Ein Build-/Package-Manager ist nicht erforderlich.

## Lizenzierung und Quellen

Im Repository ist bewusst keine Open-Source-Lizenz festgelegt. Falls andere den Code rechtlich nachnutzen dürfen sollen, muss eine passende Lizenz gewählt werden. Quellenverweise zu technischen Übergängen befinden sich in der Anwendung. Prüfe Angaben und Quellen vor einer öffentlichen oder didaktischen Verwendung.
