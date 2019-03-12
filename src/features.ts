import { ADDITIVE_IDENTITY, apply, INITIAL, Maybe, MULTIPLICATIVE_IDENTITY, round } from '@musical-patterns/utilities'
import { COMPILER_PRECISION } from './constants'
import { SoundFeature } from './nominals'
import { CompileSoundsOptions, ComputeScalePropertiesParameters, NoteFeature, Scale, ScaleProperties } from './types'

const computeScaleProperties: (scaleStuffParameters: ComputeScalePropertiesParameters) => ScaleProperties =
    ({ index, scaleIndex, options }: ComputeScalePropertiesParameters): ScaleProperties => {
        const { scales = [] } = options || {}
        const scale: Scale = scales.length !== 0 ? apply.Ordinal(scales, scaleIndex) : { scalars: [] }
        const {
            translation: scaleTranslation = ADDITIVE_IDENTITY,
            scalar: scaleScalar = MULTIPLICATIVE_IDENTITY,
            scalars = [],
        }: Scale = scale

        const scaleElement: Maybe<SoundFeature> = scalars.length !== 0 ? apply.Ordinal(scalars, index) : undefined

        return { scaleTranslation, scaleScalar, scaleElement }
    }

const compileSoundFeature:
    <SoundFeatureType extends SoundFeature>(
        noteFeature: NoteFeature, options?: CompileSoundsOptions,
    ) => SoundFeatureType =
    <SoundFeatureType extends SoundFeature>(
        noteFeature: NoteFeature, options?: CompileSoundsOptions,
    ): SoundFeatureType => {
        const {
            index = INITIAL,
            translation: noteTranslation = ADDITIVE_IDENTITY,
            scalar: noteScalar = MULTIPLICATIVE_IDENTITY,
            scaleIndex = INITIAL,
        }: NoteFeature = noteFeature

        const { scaleElement, scaleScalar, scaleTranslation } = computeScaleProperties({ index, scaleIndex, options })

        let soundFeature: SoundFeature = scaleElement || MULTIPLICATIVE_IDENTITY

        soundFeature = apply.Scalar(soundFeature, noteScalar)
        soundFeature = apply.Scalar(soundFeature, scaleScalar)

        soundFeature = apply.Translation(soundFeature, noteTranslation)
        soundFeature = apply.Translation(soundFeature, scaleTranslation)

        return round(soundFeature, COMPILER_PRECISION) as SoundFeatureType
    }

export {
    compileSoundFeature,
}
