#!/usr/bin/env bash

set -e

tsc -p tsconfig-node.json
if [[ $? == 0 ]] ; then
	ts-node -P tsconfig-node.json node_modules/@musical-patterns/cli-pattern/bin/snapshot.js
fi
