import { OscillatorName, SampleName, TimbreName } from '@musical-patterns/performer'
import { Maybe, Ordinal, Scalar, Translation } from '@musical-patterns/utilities'
import { SoundFeature } from './nominal'

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
    // tslint:disable-next-line no-any
    spec?: { initial: any },
    // tslint:disable-next-line no-any
    specs?: any,
}

// tslint:disable-next-line no-any
type MaterializeEntities = (specs?: any) => Entity[]
// tslint:disable-next-line no-any
type MaterializeScales = (specs?: any) => Scale[]

interface Entity {
    notes?: Note[],
    timbreName?: TimbreName,
}

interface Scale extends Adjustable {
    scalars?: Scalar[],
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
    ScaleProperties,
    ComputeScalePropertiesParameters,
}
