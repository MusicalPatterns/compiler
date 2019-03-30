// tslint:disable no-any max-file-line-count

import { OscillatorName, SampleName, Section } from '@musical-patterns/performer'
import { Maybe, Ordinal, Scalar, Translation } from '@musical-patterns/utilities'
import { SoundFeature } from './nominals'

type TimbreName = SampleName | OscillatorName

// tslint:disable-next-line variable-name typedef
const TimbreNameEnum = {
    ...OscillatorName,
    ...SampleName,
}

interface CompileVoiceParameters {
    entity: Entity,
    scales?: Scale[]
}

interface CompileVoicesParameters {
    entities: Entity[],
    scales?: Scale[]
}

interface CompileSoundsOptions {
    scales?: Scale[],
}

interface Material {
    materializeEntities: MaterializeEntities,
    materializeScales?: MaterializeScales,
}

interface CompilePatternParameters {
    material: Material,
    spec?: { initialSpecs: any },
    specs?: any,
}

type MaterializeEntities = (specs?: any) => Entity[]
type MaterializeScales = (specs?: any) => Scale[]

interface Entity {
    sections?: NotesSection[],
    timbreName?: TimbreName,
}

interface Scale extends Adjustable {
    scalars?: Scalar[],
}

interface NotesSection extends Section {
    notes?: Note[],
}

interface Note {
    duration?: NoteFeature,
    gain?: NoteFeature,
    pitch?: NoteFeature,
    position?: NoteFeature | NoteFeature[],
    sustain?: NoteFeature,
}

interface Adjustable {
    scalar?: Scalar,
    translation?: Translation,
}

interface NoteFeature extends Adjustable {
    index?: Ordinal,
    scaleIndex?: Ordinal,
}

interface ComputeScalePropertiesParameters {
    index: Ordinal,
    options?: CompileSoundsOptions,
    scaleIndex: Ordinal,
}

interface ScaleProperties {
    scaleElement: Maybe<SoundFeature>,
    scaleScalar: Scalar,
    scaleTranslation: Translation,
}

export {
    CompileVoiceParameters,
    CompileVoicesParameters,
    CompileSoundsOptions,
    MaterializeEntities,
    MaterializeScales,
    Entity,
    Scale,
    Note,
    Adjustable,
    NoteFeature,
    CompilePatternParameters,
    Material,
    TimbreNameEnum,
    TimbreName,
    ScaleProperties,
    ComputeScalePropertiesParameters,
    NotesSection,
}
