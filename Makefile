PYTHON ?= python3

.PHONY: all build test check deploy

# Standard: das veröffentlichbare Einzeldatei-Artefakt bauen und prüfen.
all: deploy

build:
	$(PYTHON) scripts/build.py

test:
	$(PYTHON) -m unittest discover -s tests -v

check:
	$(PYTHON) scripts/build.py --check

# Bereitet index.html für einen GitHub-Pages-Commit vor; ein Push erfolgt bewusst nicht.
deploy: build test check
	@echo "Deployment-Artefakt ist bereit: index.html"
