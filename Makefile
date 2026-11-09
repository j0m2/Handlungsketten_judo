PYTHON ?= python3
VERSION ?= $(shell TZ=Europe/Berlin date '+%Y.%m.%d.%H%M%S')
BUILD_DATE ?= $(shell TZ=Europe/Berlin date '+%d.%m.%Y, %H:%M %Z')

.PHONY: all build test check deploy

# Standard: das veröffentlichbare Einzeldatei-Artefakt bauen und prüfen.
all: deploy

build:
	$(PYTHON) scripts/build.py

test:
	$(PYTHON) -m unittest discover -s tests -v

check:
	$(PYTHON) scripts/build.py --check

# Setzt Versionsnummer und Datum, baut index.html und prüft den Stand für GitHub Pages.
# Beispiel für eine eigene Versionsnummer: make deploy VERSION=1.2.0
deploy:
	$(PYTHON) scripts/build.py --version "$(VERSION)" --build-date "$(BUILD_DATE)"
	$(MAKE) test
	$(MAKE) check
	@echo "Deployment-Artefakt ist bereit: index.html"
