import {
    apply,
    Coordinate,
    CoordinateElement,
    Frequency,
    Note,
    NotePropertySpec,
    NoteSpec,
    Part,
    PartSpec,
    Scalar,
    Time,
    to,
} from '@musical-patterns/shared'
import { compileNoteProperty } from './noteProperty'
import { CompileNotesOptions } from './types'

const defaultNotePropertySpec: NotePropertySpec = {
    index: to.Index(0),
    scalar: to.Scalar(1),
    scaleIndex: to.Index(0),
}

const compilePart: (partSpec: PartSpec, compileNotesOptions: CompileNotesOptions) => Part =
    (partSpec: PartSpec, { scales }: CompileNotesOptions): Part =>
        partSpec.map((noteSpec: NoteSpec): Note => {
            const {
                durationSpec = defaultNotePropertySpec,
                gainSpec = defaultNotePropertySpec,
                pitchSpec = defaultNotePropertySpec,
                positionSpec = defaultNotePropertySpec,
                sustainSpec = defaultNotePropertySpec,
            } = noteSpec

            const duration: Time = compileNoteProperty(durationSpec, { scales }) as Time
            const gain: Scalar = compileNoteProperty(gainSpec, { scales }) as Scalar
            const position: Coordinate =
                positionSpec instanceof Array ?
                    positionSpec.map(
                        (positionElementSpec: NotePropertySpec): CoordinateElement =>
                            compileNoteProperty(positionElementSpec, { scales }) as CoordinateElement)
                    :
                    [ compileNoteProperty(positionSpec, { scales }) as CoordinateElement ]
            const frequency: Frequency = compileNoteProperty(pitchSpec, { scales }) as Frequency
            const sustainAttempt: Time = compileNoteProperty(sustainSpec, { scales }) as Time

            const sustain: Time = sustainAttempt < duration ?
                sustainAttempt :
                duration

            return { duration, gain, frequency, position, sustain }
        })

export {
    compilePart,
}
