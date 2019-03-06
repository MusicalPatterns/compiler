import { ADDITIVE_IDENTITY, apply, INITIAL, Maybe, MULTIPLICATIVE_IDENTITY, round } from '@musical-patterns/utilities'
import { COMPILER_PRECISION } from './constants'
import { NoteProperty } from './nominal'
import { CompileNotesOptions, NotePropertySpec, Scale } from './types'

const compileNoteProperty:
    <T extends NoteProperty>(notePropertySpec: NotePropertySpec, options?: CompileNotesOptions) => T =
    <T extends NoteProperty>(notePropertySpec: NotePropertySpec, options?: CompileNotesOptions): T => {
        const {
            index = INITIAL,
            translation: noteTranslation = ADDITIVE_IDENTITY,
            scalar: noteScalar = MULTIPLICATIVE_IDENTITY,
            scaleIndex = INITIAL,
        }: NotePropertySpec = notePropertySpec

        const { scales = [] } = options || {}
        const scale: Scale = scales.length ? apply.Ordinal(scales, scaleIndex) : { scalars: [] }
        const {
            translation: scaleTranslation = ADDITIVE_IDENTITY,
            scalar: scaleScalar = MULTIPLICATIVE_IDENTITY,
            scalars = [],
        }: Scale = scale

        const scaleElement: Maybe<NoteProperty> = apply.Ordinal(scalars, index)
        let noteProperty: NoteProperty = scaleElement || MULTIPLICATIVE_IDENTITY

        noteProperty = apply.Scalar(noteProperty, noteScalar)
        noteProperty = apply.Scalar(noteProperty, scaleScalar)

        noteProperty = apply.Translation(noteProperty, noteTranslation)
        noteProperty = apply.Translation(noteProperty, scaleTranslation)

        return round(noteProperty, COMPILER_PRECISION) as T
    }

export {
    compileNoteProperty,
}
