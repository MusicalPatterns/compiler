import { apply, Maybe, to } from '@musical-patterns/utilities'
import { NoteProperty } from './nominal'
import { CompileNotesOptions, NotePropertySpec, Scale } from './types'

const compileNoteProperty: (notePropertySpec: NotePropertySpec, options?: CompileNotesOptions) => NoteProperty =
    (notePropertySpec: NotePropertySpec, options?: CompileNotesOptions): NoteProperty => {
        const {
            index = to.Ordinal(0),
            translation: noteOffset = to.Translation(0),
            scalar: noteScalar = to.Scalar(1),
            scaleIndex = to.Ordinal(0),
        }: NotePropertySpec = notePropertySpec

        const { scales = [] } = options || {}
        const scale: Scale = scales.length ? apply.Ordinal(scales, scaleIndex) : { scalars: [] }
        const {
            translation: scaleOffset = to.Translation(0),
            scalar: scaleScalar = to.Scalar(1),
            scalars = [],
        }: Scale = scale

        const scaleElement: Maybe<NoteProperty> = apply.Ordinal(scalars, index)
        let noteProperty: NoteProperty = scaleElement || to.Scalar(1)

        noteProperty = apply.Scalar(noteProperty, noteScalar)
        noteProperty = apply.Scalar(noteProperty, scaleScalar)

        noteProperty = apply.Translation(noteProperty, noteOffset)
        noteProperty = apply.Translation(noteProperty, scaleOffset)

        return noteProperty
    }

export {
    compileNoteProperty,
}
