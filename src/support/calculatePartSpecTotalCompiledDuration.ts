import { from, Time, to } from '@musical-patterns/utilities'
import { compileNoteProperty } from '../noteProperty'
import { NotePropertySpec, NoteSpec, PartSpec, Scale } from '../types'

const calculatePartSpecTotalCompiledDuration: (partSpec: PartSpec, scales: Scale[]) => Time =
    (partSpec: PartSpec, scales: Scale[]): Time =>
        partSpec.reduce(
            (totalDuration: Time, noteSpec: NoteSpec): Time => {
                const durationSpec: NotePropertySpec = noteSpec.durationSpec || {}
                const duration: Time = compileNoteProperty(durationSpec, { scales }) as Time

                return to.Time(from.Time(totalDuration) + from.Time(duration))
            },
            to.Time(0),
        )

export {
    calculatePartSpecTotalCompiledDuration,
}
