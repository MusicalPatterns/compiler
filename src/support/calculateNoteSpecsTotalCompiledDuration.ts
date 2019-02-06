import { sum, Time, to } from '@musical-patterns/utilities'
import { compileNoteProperty } from '../noteProperty'
import { NotePropertySpec, NoteSpec, Scale } from '../types'

const calculateNoteSpecsTotalCompiledDuration: (noteSpecs: NoteSpec[], scales?: Scale[]) => Time =
    (noteSpecs: NoteSpec[], scales?: Scale[]): Time =>
        noteSpecs.reduce(
            (totalDuration: Time, noteSpec: NoteSpec): Time => {
                const durationSpec: NotePropertySpec = noteSpec.durationSpec || {}
                const duration: Time = compileNoteProperty(durationSpec, { scales }) as Time

                return sum(totalDuration, duration)
            },
            to.Time(0),
        )

export {
    calculateNoteSpecsTotalCompiledDuration,
}
