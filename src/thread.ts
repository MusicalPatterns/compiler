import { Note, ThreadSpec, VoiceSpec } from '@musical-patterns/performer'
import { Maybe } from '@musical-patterns/utilities'
import { compileNotes } from './notes'
import { compileTimbre } from './timbre'
import { CompileThreadParameters } from './types'

const compileThreadSpec: (compileEntityParameters: CompileThreadParameters) => ThreadSpec =
    ({ entity, scales }: CompileThreadParameters): ThreadSpec => {
        const {
            noteSpecs = [],
            timbreName,
        } = entity

        const notes: Note[] = compileNotes(noteSpecs, { scales })
        const voiceSpec: Maybe<VoiceSpec> = compileTimbre(timbreName)

        return {
            notes,
            voiceSpec,
        }
    }

export {
    compileThreadSpec,
}
