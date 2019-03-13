import { Voice } from '@musical-patterns/performer'
import { CompilePatternParameters, Entity, Material, Scale } from './types'
import { compileVoices } from './voices'

const compilePattern: (compilePatternParameters: CompilePatternParameters) => Promise<Voice[]> =
    async ({ specs, material, spec }: CompilePatternParameters): Promise<Voice[]> => {
        // tslint:disable-next-line no-any
        const specsToCompileWith: any = specs || spec && spec.initialSpecs

        const { materializeEntities, materializeScales }: Material = material

        const entities: Entity[] = materializeEntities(specsToCompileWith)
        const scales: Scale[] = materializeScales ? materializeScales(specsToCompileWith) : []

        return compileVoices({ entities, scales })
    }

export {
    compilePattern,
}
