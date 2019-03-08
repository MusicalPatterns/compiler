import { Ms, sum, to } from '@musical-patterns/utilities'
import { compileNoteAspect } from '../noteAspect'
import { NoteAspectSpec, NoteSpec, Scale } from '../types'

const calculateNoteSpecsTotalCompiledDuration: (noteSpecs: NoteSpec[], scales?: Scale[]) => Ms =
    (noteSpecs: NoteSpec[], scales?: Scale[]): Ms =>
        noteSpecs.reduce(
            (totalDuration: Ms, noteSpec: NoteSpec): Ms => {
                const durationSpec: NoteAspectSpec = noteSpec.durationSpec || {}
                const duration: Ms = compileNoteAspect(durationSpec, { scales })

                return sum(totalDuration, duration)
            },
            to.Ms(0),
        )

export {
    calculateNoteSpecsTotalCompiledDuration,
}
