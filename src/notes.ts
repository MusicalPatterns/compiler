import { Note } from '@musical-patterns/performer'
import {
    ADDITIVE_IDENTITY,
    apply,
    Coordinate,
    from,
    Hz,
    INITIAL, Meters,
    Ms,
    MULTIPLICATIVE_IDENTITY,
    Scalar,
    THREE_DIMENSIONAL,
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
    (positionSpec?: NotePropertySpec | NotePropertySpec[], options?: CompileNotesOptions) => Coordinate<Meters> =
    (positionSpec?: NotePropertySpec | NotePropertySpec[], options?: CompileNotesOptions): Coordinate<Meters>  => {
        const position: Coordinate<Meters> = positionSpec ?
            positionSpec instanceof Array ?
                positionSpec.map(
                    (positionElementSpec: NotePropertySpec): Meters =>
                        compileNoteProperty(positionElementSpec, options) as Meters)
                :
                [ compileNoteProperty(positionSpec, options) as Meters ]
            :
            [] as Coordinate<Meters>
        while (position.length < from.Cardinal(THREE_DIMENSIONAL)) {
            position.push(to.Meters(0))
        }

        return position
    }

const compileSustain: (noteSpec: NoteSpec, duration: Ms, options?: CompileNotesOptions) => Ms =
    (noteSpec: NoteSpec, duration: Ms, options?: CompileNotesOptions): Ms => {
        const sustainSpec: NotePropertySpec = noteSpec.sustainSpec || noteSpec.durationSpec || defaultNotePropertySpec
        const sustainAttempt: Ms = compileNoteProperty(sustainSpec, options) as Ms

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

        const duration: Ms = compileNoteProperty(durationSpec, options) as Ms
        const gain: Scalar = compileNoteProperty(gainSpec, options) as Scalar
        const frequency: Hz = compileNoteProperty(pitchSpec, options) as Hz

        const position: Coordinate<Meters> = compilePosition(noteSpec.positionSpec, options)
        const sustain: Ms = compileSustain(noteSpec, duration, options)

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
