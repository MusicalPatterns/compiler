[![Build Status](https://travis-ci.com/MusicalPatterns/compiler.svg?branch=master)](https://travis-ci.com/MusicalPatterns/compiler)

# Musical Patterns - Compiler

Compiles patterns into a format playable by the performer.

## usage

```
import { compilePattern } from '@musical-patterns/compiler'
import { setupPerformer } from '@musical-patterns/performer'

const material: Material = {
	materializeEntities,
}

const spec: MySpec = {
	// anything
}

const voices: Voice[] = await compilePattern({ material, spec })

setupPerformer({ autoStart: { voices } })

```

## migrations

If something is changing in the `performer` or `compiler` and you want backwards compatibility, use a migration.

Add a new version to the `CompilerVersion` enum. This is the version you are leaving behind.
You are creating a snapshot of the way things were at this version.
If a type has not changed from the beginning of time, you can continue to use the modern, simple named version of it.
If you're changing a type, name it after this final version it was used for, then propagate it backwards.
