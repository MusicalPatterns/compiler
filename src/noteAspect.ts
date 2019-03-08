import { ADDITIVE_IDENTITY, apply, INITIAL, Maybe, MULTIPLICATIVE_IDENTITY, round } from '@musical-patterns/utilities'
import { COMPILER_PRECISION } from './constants'
import { NoteAspect } from './nominal'
import {
    CalculateScalePropertiesParameters,
    CompileNotesOptions,
    NoteAspectSpec,
    Scale,
    ScaleProperties,
} from './types'

const calculateScaleProperties: (scaleStuffParameters: CalculateScalePropertiesParameters) => ScaleProperties =
    ({ index, scaleIndex, options }: CalculateScalePropertiesParameters): ScaleProperties => {
        const { scales = [] } = options || {}
        const scale: Scale = scales.length !== 0 ? apply.Ordinal(scales, scaleIndex) : { scalars: [] }
        const {
            translation: scaleTranslation = ADDITIVE_IDENTITY,
            scalar: scaleScalar = MULTIPLICATIVE_IDENTITY,
            scalars = [],
        }: Scale = scale

        const scaleElement: Maybe<NoteAspect> = scalars.length !== 0 ? apply.Ordinal(scalars, index) : undefined

        return { scaleTranslation, scaleScalar, scaleElement }
    }

const compileNoteAspect:
    <T extends NoteAspect>(noteAspectSpec: NoteAspectSpec, options?: CompileNotesOptions) => T =
    <T extends NoteAspect>(noteAspectSpec: NoteAspectSpec, options?: CompileNotesOptions): T => {
        const {
            index = INITIAL,
            translation: noteTranslation = ADDITIVE_IDENTITY,
            scalar: noteScalar = MULTIPLICATIVE_IDENTITY,
            scaleIndex = INITIAL,
        }: NoteAspectSpec = noteAspectSpec

        const { scaleElement, scaleScalar, scaleTranslation } = calculateScaleProperties({ index, scaleIndex, options })

        let noteAspect: NoteAspect = scaleElement || MULTIPLICATIVE_IDENTITY

        noteAspect = apply.Scalar(noteAspect, noteScalar)
        noteAspect = apply.Scalar(noteAspect, scaleScalar)

        noteAspect = apply.Translation(noteAspect, noteTranslation)
        noteAspect = apply.Translation(noteAspect, scaleTranslation)

        return round(noteAspect, COMPILER_PRECISION) as T
    }

export {
    compileNoteAspect,
}
