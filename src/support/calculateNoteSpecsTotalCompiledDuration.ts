import { Ms, sum, to } from '@musical-patterns/utilities'
import { compileNoteProperty } from '../noteProperty'
import { NotePropertySpec, NoteSpec, Scale } from '../types'

const calculateNoteSpecsTotalCompiledDuration: (noteSpecs: NoteSpec[], scales?: Scale[]) => Ms =
    (noteSpecs: NoteSpec[], scales?: Scale[]): Ms =>
        noteSpecs.reduce(
            (totalDuration: Ms, noteSpec: NoteSpec): Ms => {
                const durationSpec: NotePropertySpec = noteSpec.durationSpec || {}
                const duration: Ms = compileNoteProperty(durationSpec, { scales })

                return sum(totalDuration, duration)
            },
            to.Ms(0),
        )

export {
    calculateNoteSpecsTotalCompiledDuration,
}
