SHELL := /bin/bash

MAKEFLAGS += --no-print-directory --always-make

Makefile:
	@:

%:
	@bash node_modules/.bin/musical-patterns $@

-include Makefile.*
