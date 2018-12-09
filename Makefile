.PHONY: lint
lint:
	musical-patterns lint

.PHONY: test
test:
	musical-patterns test

%:
	musical-patterns $@

-include Makefile.*
