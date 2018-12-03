# Musical Patterns Compiler

compiles patterns

```
import { compilePattern } from '@musical-patterns/compiler'
import { setupPerformer } from '@musical-patterns/performer'

const material: PatternMaterial = {
	buildEntitiesFunction,
}

const threadSpecs: ThreadSpec[] = await compilePattern({ material })

setupPerformer({ autoStart: { threadSpecs } })

```
