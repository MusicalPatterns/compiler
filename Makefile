.PHONY: lint
.PHONY: test

-include Makefile.*

build:
	musical-patterns build

lint:
	musical-patterns lint

publish:
	musical-patterns publish

pull:
	musical-patterns pull

push:
	musical-patterns push

ship:
	musical-patterns ship

switch_back_to_remote:
	musical-patterns switch_back_to_remote

test:
	musical-patterns test

use_latest_local:
	musical-patterns use_latest_local
