import { ThreadSpec } from '@musical-patterns/performer'
import { compileThreadSpecs } from './threads'
import { CompilePatternParameters, Entity, Material, Scale } from './types'

const compilePattern: (compilePatternParameters: CompilePatternParameters) => Promise<ThreadSpec[]> =
    async ({ spec, material }: CompilePatternParameters): Promise<ThreadSpec[]> => {
        const { buildEntitiesFunction, buildScalesFunction }: Material = material

        const entities: Entity[] = buildEntitiesFunction(spec)
        const scales: Scale[] = buildScalesFunction ? buildScalesFunction(spec) : []

        return compileThreadSpecs({ entities, scales })
    }

export {
    compilePattern,
}
