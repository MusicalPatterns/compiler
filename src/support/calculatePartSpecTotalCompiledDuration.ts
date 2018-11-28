import { from, NotePropertySpec, NoteSpec, PartSpec, Scale, Time, to } from '@musical-patterns/shared'
import { compileNoteProperty } from '../noteProperty'

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
