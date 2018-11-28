import { Entity, Pattern, PatternMaterial, Scale, ThreadSpec } from '@musical-patterns/shared'
import { compileThreadSpecs } from './threads'

const compilePattern: (compilePatternParameters: Pattern) => Promise<ThreadSpec[]> =
    async ({ spec, material }: Pattern): Promise<ThreadSpec[]> => {
        const { buildEntitiesFunction, buildScalesFunction }: PatternMaterial = material

        const entities: Entity[] = buildEntitiesFunction(spec)
        const scales: Scale[] = buildScalesFunction(spec)

        return compileThreadSpecs({ entities, scales })
    }

export {
    compilePattern,
}
