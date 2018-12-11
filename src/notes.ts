import { Note } from '@musical-patterns/performer'
import {
    Coordinate,
    CoordinateElement,
    Frequency,
    from,
    Scalar,
    THREE_DIMENSIONAL,
    Time,
    to,
} from '@musical-patterns/utilities'
import { compileNoteProperty } from './noteProperty'
import { CompileNotesOptions, NotePropertySpec, NoteSpec } from './types'

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
            positionSpec,
            sustainSpec = defaultNotePropertySpec,
        } = noteSpec

        const duration: Time = compileNoteProperty(durationSpec, options) as Time
        const gain: Scalar = compileNoteProperty(gainSpec, options) as Scalar
        const position: Coordinate = positionSpec ?
            positionSpec instanceof Array ?
                positionSpec.map(
                    (positionElementSpec: NotePropertySpec): CoordinateElement =>
                        compileNoteProperty(positionElementSpec, options) as CoordinateElement)
                :
                [ compileNoteProperty(positionSpec, options) as CoordinateElement ]
            :
            [] as Coordinate
        while (position.length < from.Count(THREE_DIMENSIONAL)) {
            position.push(to.CoordinateElement(0))
        }
        const frequency: Frequency = compileNoteProperty(pitchSpec, options) as Frequency
        const sustainAttempt: Time = compileNoteProperty(sustainSpec, options) as Time

        const sustain: Time = sustainAttempt < duration ?
            sustainAttempt :
            duration

        const note: Note = { duration, gain, frequency, position, sustain }

        return note
    }

const compileNotes: (noteSpecs: NoteSpec[], options: CompileNotesOptions) => Note[] =
    (noteSpecs: NoteSpec[], options: CompileNotesOptions): Note[] =>
        noteSpecs.map((noteSpec: NoteSpec): Note =>
            // tslint:disable-next-line:no-unsafe-any
            compileNote(noteSpec, options))

export {
    compileNote,
    compileNotes,
}
