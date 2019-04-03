[![Build Status](https://travis-ci.com/MusicalPatterns/compiler.svg?branch=master)](https://travis-ci.com/MusicalPatterns/compiler)

# Musical Patterns - Compiler

Takes whatever amazing craziness a given pattern calls for and compiles it down into a basic format playable by the `@musical-patterns/performer`.

First it calls each of the "materialize" functions with the specs you've provided (or defaults to the pattern's initial specs).
For example, you could materialize some scales and entities using specs provided through making selections in the UI of the `@musical-patterns/playroom`.
The pattern's specs and materials are unique to each pattern, but their job is to together produce data the compiler can resolve.
So, once thus materialized, the compiler reduces the large amount of data produced down to fundamental sound instructions for the `@musical-patterns/performer`.

## usage

```
import { compilePattern } from '@musical-patterns/compiler'
import { CompiledPattern, setupPerformer, Voice } from '@musical-patterns/performer'

const material: Material = {
	materializeEntities,
}

const spec: MySpec extends StandardSpec = {
	// anything
}

const { voices, totalDuration, segnoTime }: CompiledPattern = await compilePattern({ material, spec })

setupPerformer({ autoStart: { voices } })

```

## terminology

### repetend

When a voice has a section which does not specify the number of times it should repeat, it will repeat forever. 
In this case, it is the voice's repetend. A repetend is a section. Its index is the index within an array of sections.

### segno

Italian for 'sign', this is the time position a voice repeats from once it reaches its end.
The segno index is the index of a sound in the voice's sounds array.
The segno time is a position in milliseconds.
