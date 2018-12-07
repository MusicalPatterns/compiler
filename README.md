# Musical Patterns - compiler

Compiles patterns into a format playable by the performer.

## usage

```
import { compilePattern } from '@musical-patterns/compiler'
import { setupPerformer } from '@musical-patterns/performer'

const material: PatternMaterial = {
	buildEntitiesFunction,
}

const threadSpecs: ThreadSpec[] = await compilePattern({ material })

setupPerformer({ autoStart: { threadSpecs } })

```
