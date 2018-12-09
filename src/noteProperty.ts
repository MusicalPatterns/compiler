import { apply, Maybe, to } from '@musical-patterns/utilities'
import { CompileNotesOptions, NoteProperty, NotePropertySpec, Scale } from './types'

const compileNoteProperty: (notePropertySpec: NotePropertySpec, options?: CompileNotesOptions) => NoteProperty =
    (notePropertySpec: NotePropertySpec, options?: CompileNotesOptions): NoteProperty => {
        const {
            index = to.Index(0),
            offset: noteOffset = to.Offset(0),
            scalar: noteScalar = to.Scalar(1),
            scaleIndex = to.Index(0),
        }: NotePropertySpec = notePropertySpec

        const { scales = [] } = options || {}
        const scale: Scale = scales.length ? apply.Index(scales, scaleIndex) : { scalars: [] }
        const {
            offset: scaleOffset = to.Offset(0),
            scalar: scaleScalar = to.Scalar(1),
            scalars = [],
        }: Scale = scale

        const scaleElement: Maybe<NoteProperty> = apply.Index(scalars, index)
        let noteProperty: NoteProperty = scaleElement || to.Scalar(1)

        noteProperty = apply.Scalar(noteProperty, noteScalar)
        noteProperty = apply.Scalar(noteProperty, scaleScalar)

        noteProperty = apply.Offset(noteProperty, noteOffset)
        noteProperty = apply.Offset(noteProperty, scaleOffset)

        return noteProperty
    }

export {
    compileNoteProperty,
}
