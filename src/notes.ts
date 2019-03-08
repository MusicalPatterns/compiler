import { Note } from '@musical-patterns/performer'
import {
    ADDITIVE_IDENTITY,
    apply,
    Coordinate,
    from,
    Hz,
    INITIAL,
    Meters,
    Ms,
    MULTIPLICATIVE_IDENTITY,
    Scalar,
    THREE_DIMENSIONAL,
    to,
} from '@musical-patterns/utilities'
import { DEFAULT_TRANSLATION_FOR_ALMOST_FULL_SUSTAIN } from './constants'
import { compileNoteAspect } from './noteAspect'
import { CompileNotesOptions, NoteAspectSpec, NoteSpec } from './types'

const defaultNoteAspectSpec: NoteAspectSpec = {
    index: INITIAL,
    scalar: MULTIPLICATIVE_IDENTITY,
    scaleIndex: INITIAL,
    translation: ADDITIVE_IDENTITY,
}

const compilePosition:
    (positionSpec?: NoteAspectSpec | NoteAspectSpec[], options?: CompileNotesOptions) => Coordinate<Meters> =
    (positionSpec?: NoteAspectSpec | NoteAspectSpec[], options?: CompileNotesOptions): Coordinate<Meters> => {
        const position: Coordinate<Meters> = positionSpec ?
            positionSpec instanceof Array ?
                positionSpec.map(
                    (positionElementSpec: NoteAspectSpec): Meters =>
                        compileNoteAspect(positionElementSpec, options))
                :
                [ compileNoteAspect(positionSpec, options) ]
            :
            []
        while (position.length < from.Cardinal(THREE_DIMENSIONAL)) {
            position.push(to.Meters(0))
        }

        return position
    }

const compileSustain: (noteSpec: NoteSpec, duration: Ms, options?: CompileNotesOptions) => Ms =
    (noteSpec: NoteSpec, duration: Ms, options?: CompileNotesOptions): Ms => {
        const sustainSpec: NoteAspectSpec = noteSpec.sustainSpec || noteSpec.durationSpec || defaultNoteAspectSpec
        const sustainAttempt: Ms = compileNoteAspect(sustainSpec, options)

        return sustainAttempt < duration ?
            sustainAttempt :
            apply.Translation(duration, DEFAULT_TRANSLATION_FOR_ALMOST_FULL_SUSTAIN)
    }

const compileNote: (noteSpec: NoteSpec, options?: CompileNotesOptions) => Note =
    (noteSpec: NoteSpec, options?: CompileNotesOptions): Note => {
        const {
            durationSpec = defaultNoteAspectSpec,
            gainSpec = defaultNoteAspectSpec,
            pitchSpec = defaultNoteAspectSpec,
        } = noteSpec

        const duration: Ms = compileNoteAspect(durationSpec, options)
        const gain: Scalar = compileNoteAspect(gainSpec, options)
        const frequency: Hz = compileNoteAspect(pitchSpec, options)

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
