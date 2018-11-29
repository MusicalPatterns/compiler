import { Note, ThreadSpec } from '@musical-patterns/performer'
import { compileNotes } from './notes'
import { CompileThreadParameters } from './types'

const compileThreadSpec: (compileEntityParameters: CompileThreadParameters) => ThreadSpec =
    ({ entity, scales }: CompileThreadParameters): ThreadSpec => {
        const {
            partSpec = [],
            voiceSpec,
        } = entity

        const notes: Note[] = compileNotes(partSpec, { scales })

        return {
            notes,
            voiceSpec,
        }
    }

export {
    compileThreadSpec,
}
