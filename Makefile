SHELL := /bin/bash

MAKEFLAGS += --no-print-directory --always-make

Makefile:
	@:

%:
	@musical-patterns-cli $@

-include Makefile.*
