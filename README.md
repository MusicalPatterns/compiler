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
