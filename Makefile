MAKEFLAGS += --no-print-directory --always-make

Makefile.cli:
	@:

Makefile:
	@:

%:
	@musical-patterns $@

-include Makefile.*
