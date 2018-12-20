MAKEFLAGS += --no-print-directory

.PHONY: lint
.PHONY: test

%:
	@musical-patterns $@

-include Makefile.*
