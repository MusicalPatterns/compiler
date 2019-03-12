import { Sound, SourceRequest, Voice } from '@musical-patterns/performer'
import { Maybe } from '@musical-patterns/utilities'
import { compileSounds } from './sounds'
import { compileSourceRequest } from './sources'
import { CompileVoiceParameters, CompileVoicesParameters, Entity } from './types'

const compileVoice: (compileVoiceParameters: CompileVoiceParameters) => Voice =
    ({ entity, scales }: CompileVoiceParameters): Voice => {
        const {
            notes = [],
            timbreName,
        } = entity

        const sounds: Sound[] = compileSounds(notes, { scales })
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
