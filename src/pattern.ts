import { Voice } from '@musical-patterns/performer'
import { CompilePatternParameters, Entity, Material, Scale } from './types'
import { compileVoices } from './voices'

const compilePattern: (compilePatternParameters: CompilePatternParameters) => Promise<Voice[]> =
    async ({ spec, material, data }: CompilePatternParameters): Promise<Voice[]> => {
        // tslint:disable-next-line no-any
        const specToCompileWith: any = spec || data && data.initial

        const { materializeEntities, materializeScales }: Material = material

        const entities: Entity[] = materializeEntities(specToCompileWith)
        const scales: Scale[] = materializeScales ? materializeScales(specToCompileWith) : []

        return compileVoices({ entities, scales })
    }

export {
    compilePattern,
}
