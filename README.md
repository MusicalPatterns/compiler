[![Build Status](https://travis-ci.com/MusicalPatterns/compiler.svg?branch=master)](https://travis-ci.com/MusicalPatterns/compiler)

# Musical Patterns - compiler

Compiles patterns into a format playable by the performer.

## usage

```
import { compilePattern } from '@musical-patterns/compiler'
import { setupPerformer } from '@musical-patterns/performer'

const material: PatternMaterial = {
	buildEntitiesFunction,
}

const spec: MyPatternSpec = {
	// anything
}

const threadSpecs: ThreadSpec[] = await compilePattern({ material, spec })

setupPerformer({ autoStart: { threadSpecs } })

```

## cli

```
mps
```

Update the snapshot for a pattern. This snapshot is used by the snapshot test to ensure the pattern stays locked down unless you mean to change it.
When you import a published pattern, you can import either the snapshot, or the pattern if you want to customize it before performing by configuring its spec and recompiling it.
