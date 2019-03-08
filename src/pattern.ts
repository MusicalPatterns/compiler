import { ThreadSpec } from '@musical-patterns/performer'
import { compileThreadSpecs } from './threads'
import { CompilePatternParameters, Entity, Material, Scale } from './types'

const compilePattern: (compilePatternParameters: CompilePatternParameters) => Promise<ThreadSpec[]> =
    async ({ spec, material, data }: CompilePatternParameters): Promise<ThreadSpec[]> => {
        // tslint:disable-next-line no-any
        const specToCompileWith: any = spec || data && data.initial

        const { buildEntitiesFunction, buildScalesFunction }: Material = material

        const entities: Entity[] = buildEntitiesFunction(specToCompileWith)
        const scales: Scale[] = buildScalesFunction ? buildScalesFunction(specToCompileWith) : []

        return compileThreadSpecs({ entities, scales })
    }

export {
    compilePattern,
}
