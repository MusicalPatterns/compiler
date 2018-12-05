.PHONY: lint
.PHONY: test

publish:
	musical-patterns publish

test:
	musical-patterns test

lint:
	musical-patterns lint

build:
	musical-patterns build tsc
