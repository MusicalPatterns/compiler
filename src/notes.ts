import { Note } from '@musical-patterns/performer'
import { Coordinate, CoordinateElement, Frequency, Scalar, Time, to } from '@musical-patterns/utilities'
import { compileNoteProperty } from './noteProperty'
import { CompileNotesOptions, NotePropertySpec, NoteSpec, PartSpec } from './types'

const defaultNotePropertySpec: NotePropertySpec = {
    index: to.Index(0),
    offset: to.Offset(0),
    scalar: to.Scalar(1),
    scaleIndex: to.Index(0),
}

const compileNote: (noteSpec: NoteSpec, options?: CompileNotesOptions) => Note =
    (noteSpec: NoteSpec, options?: CompileNotesOptions): Note => {
        const {
            durationSpec = defaultNotePropertySpec,
            gainSpec = defaultNotePropertySpec,
            pitchSpec = defaultNotePropertySpec,
            positionSpec = defaultNotePropertySpec,
            sustainSpec = defaultNotePropertySpec,
        } = noteSpec

        const duration: Time = compileNoteProperty(durationSpec, options) as Time
        const gain: Scalar = compileNoteProperty(gainSpec, options) as Scalar
        const position: Coordinate =
            positionSpec instanceof Array ?
                positionSpec.map(
                    (positionElementSpec: NotePropertySpec): CoordinateElement =>
                        compileNoteProperty(positionElementSpec, options) as CoordinateElement)
                :
                [ compileNoteProperty(positionSpec, options) as CoordinateElement ]
        const frequency: Frequency = compileNoteProperty(pitchSpec, options) as Frequency
        const sustainAttempt: Time = compileNoteProperty(sustainSpec, options) as Time

        const sustain: Time = sustainAttempt < duration ?
            sustainAttempt :
            duration

        return { duration, gain, frequency, position, sustain }
    }

const compileNotes: (partSpec: PartSpec, options: CompileNotesOptions) => Note[] =
    (partSpec: PartSpec, options: CompileNotesOptions): Note[] =>
        partSpec.map((noteSpec: NoteSpec): Note =>
            compileNote(noteSpec, options))

export {
    compileNote,
    compileNotes,
}
