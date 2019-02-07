import { Note } from '@musical-patterns/performer'
import {
    ADDITIVE_IDENTITY,
    apply,
    Coordinate,
    CoordinateElement,
    Frequency,
    from,
    INITIAL,
    MULTIPLICATIVE_IDENTITY,
    Scalar,
    THREE_DIMENSIONAL,
    Time,
    to,
} from '@musical-patterns/utilities'
import { DEFAULT_TRANSLATION_FOR_ALMOST_FULL_SUSTAIN } from './constants'
import { compileNoteProperty } from './noteProperty'
import { CompileNotesOptions, NotePropertySpec, NoteSpec } from './types'

const defaultNotePropertySpec: NotePropertySpec = {
    index: INITIAL,
    scalar: MULTIPLICATIVE_IDENTITY,
    scaleIndex: INITIAL,
    translation: ADDITIVE_IDENTITY,
}

const compilePosition:
    (positionSpec?: NotePropertySpec | NotePropertySpec[], options?: CompileNotesOptions) => Coordinate =
    (positionSpec?: NotePropertySpec | NotePropertySpec[], options?: CompileNotesOptions): Coordinate => {
        const position: Coordinate = positionSpec ?
            positionSpec instanceof Array ?
                positionSpec.map(
                    (positionElementSpec: NotePropertySpec): CoordinateElement =>
                        compileNoteProperty(positionElementSpec, options) as CoordinateElement)
                :
                [ compileNoteProperty(positionSpec, options) as CoordinateElement ]
            :
            [] as Coordinate
        while (position.length < from.Cardinal(THREE_DIMENSIONAL)) {
            position.push(to.CoordinateElement(0))
        }

        return position
    }

const compileSustain: (noteSpec: NoteSpec, duration: Time, options?: CompileNotesOptions) => Time =
    (noteSpec: NoteSpec, duration: Time, options?: CompileNotesOptions): Time => {
        const sustainSpec: NotePropertySpec = noteSpec.sustainSpec || noteSpec.durationSpec || defaultNotePropertySpec
        const sustainAttempt: Time = compileNoteProperty(sustainSpec, options) as Time

        return sustainAttempt < duration ?
            sustainAttempt :
            apply.Translation(duration, DEFAULT_TRANSLATION_FOR_ALMOST_FULL_SUSTAIN)
    }

const compileNote: (noteSpec: NoteSpec, options?: CompileNotesOptions) => Note =
    (noteSpec: NoteSpec, options?: CompileNotesOptions): Note => {
        const {
            durationSpec = defaultNotePropertySpec,
            gainSpec = defaultNotePropertySpec,
            pitchSpec = defaultNotePropertySpec,
        } = noteSpec

        const duration: Time = compileNoteProperty(durationSpec, options) as Time
        const gain: Scalar = compileNoteProperty(gainSpec, options) as Scalar
        const frequency: Frequency = compileNoteProperty(pitchSpec, options) as Frequency

        const position: Coordinate = compilePosition(noteSpec.positionSpec, options)
        const sustain: Time = compileSustain(noteSpec, duration, options)

        return { duration, gain, frequency, position, sustain }
    }

const compileNotes: (noteSpecs: NoteSpec[], options: CompileNotesOptions) => Note[] =
    (noteSpecs: NoteSpec[], options: CompileNotesOptions): Note[] =>
        noteSpecs.map((noteSpec: NoteSpec): Note =>
            compileNote(noteSpec, options))

export {
    compileNote,
    compileNotes,
}
