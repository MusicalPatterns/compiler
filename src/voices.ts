import { Sound, SourceRequest, Voice } from '@musical-patterns/performer'
import { Maybe } from '@musical-patterns/utilities'
import { compileSections } from './sections'
import { compileSourceRequest } from './sources'
import { CompileVoiceParameters, CompileVoicesParameters, Entity, Scale } from './types'

const compileVoice: (compileVoiceParameters: { entity: Entity, scales?: Scale[] }) => Voice =
    ({ entity, scales }: CompileVoiceParameters): Voice => {
        const {
            sections = [],
            timbreName,
        } = entity

        const sounds: Sound[] = compileSections(sections, { scales })
        const sourceRequest: Maybe<SourceRequest> = compileSourceRequest(timbreName)

        return {
            sounds,
            sourceRequest,
        }
    }

const compileVoices: (compileVoicesParameters: CompileVoicesParameters) => Voice[] =
    ({ entities, scales }: CompileVoicesParameters): Voice[] =>
        entities.map((entity: Entity): Voice =>
            compileVoice({ entity, scales }))

export {
    compileVoices,
    compileVoice,
}
