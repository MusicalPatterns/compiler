import { ThreadSpec } from '@musical-patterns/performer'
import { compileThreadSpecs } from './threads'
import { CompilePatternParameters, Entity, PatternMaterial, Scale } from './types'

const compilePattern: (compilePatternParameters: CompilePatternParameters) => Promise<ThreadSpec[]> =
    async ({ spec, material }: CompilePatternParameters): Promise<ThreadSpec[]> => {
        const { buildEntitiesFunction, buildScalesFunction }: PatternMaterial = material

        const entities: Entity[] = buildEntitiesFunction(spec)
        const scales: Scale[] = buildScalesFunction(spec)

        return compileThreadSpecs({ entities, scales })
    }

export {
    compilePattern,
}
