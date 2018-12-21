MAKEFLAGS += --no-print-directory --always-make

Makefile:
	@:

%:
	@musical-patterns $@

-include Makefile.*
