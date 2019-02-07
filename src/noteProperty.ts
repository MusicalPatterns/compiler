import { apply, Maybe, round, to } from '@musical-patterns/utilities'
import { COMPILER_PRECISION } from './constants'
import { NoteProperty } from './nominal'
import { CompileNotesOptions, NotePropertySpec, Scale } from './types'

const compileNoteProperty: (notePropertySpec: NotePropertySpec, options?: CompileNotesOptions) => NoteProperty =
    (notePropertySpec: NotePropertySpec, options?: CompileNotesOptions): NoteProperty => {
        const {
            index = to.Ordinal(0),
            translation: noteTranslation = to.Translation(0),
            scalar: noteScalar = to.Scalar(1),
            scaleIndex = to.Ordinal(0),
        }: NotePropertySpec = notePropertySpec

        const { scales = [] } = options || {}
        const scale: Scale = scales.length ? apply.Ordinal(scales, scaleIndex) : { scalars: [] }
        const {
            translation: scaleTranslation = to.Translation(0),
            scalar: scaleScalar = to.Scalar(1),
            scalars = [],
        }: Scale = scale

        const scaleElement: Maybe<NoteProperty> = apply.Ordinal(scalars, index)
        let noteProperty: NoteProperty = scaleElement || to.Scalar(1)

        noteProperty = apply.Scalar(noteProperty, noteScalar)
        noteProperty = apply.Scalar(noteProperty, scaleScalar)

        noteProperty = apply.Translation(noteProperty, noteTranslation)
        noteProperty = apply.Translation(noteProperty, scaleTranslation)

        return round(noteProperty, COMPILER_PRECISION)
    }

export {
    compileNoteProperty,
}
