import { OscillatorName, SampleName, TimbreName } from '@musical-patterns/performer'
import { Maybe, Ordinal, Scalar, Translation } from '@musical-patterns/utilities'
import { NoteAspect } from './nominal'

// tslint:disable-next-line variable-name typedef
const TimbreNameEnum = {
    ...OscillatorName,
    ...SampleName,
}

interface CompileThreadParameters {
    entity: Entity,
    scales?: Scale[]
}

interface CompileThreadsParameters {
    entities: Entity[],
    scales?: Scale[]
}

interface CompileNotesOptions {
    scales?: Scale[],
}

interface Material {
    buildEntitiesFunction: BuildEntitiesFunction,
    buildScalesFunction?: BuildScalesFunction,
}

interface CompilePatternParameters {
    // tslint:disable-next-line no-any
    data?: { initial: any },
    material: Material,
    // tslint:disable-next-line no-any
    spec?: any,
}

// tslint:disable-next-line no-any
type BuildEntitiesFunction = (spec?: any) => Entity[]
// tslint:disable-next-line no-any
type BuildScalesFunction = (spec?: any) => Scale[]

interface Entity {
    noteSpecs?: NoteSpec[],
    timbreName?: TimbreName,
}

interface Scale extends Adjustable {
    scalars?: Scalar[],
}

interface NoteSpec {
    durationSpec?: NoteAspectSpec,
    gainSpec?: NoteAspectSpec,
    pitchSpec?: NoteAspectSpec,
    positionSpec?: NoteAspectSpec | NoteAspectSpec[],
    sustainSpec?: NoteAspectSpec,
}

interface Adjustable {
    scalar?: Scalar,
    translation?: Translation,
}

interface NoteAspectSpec extends Adjustable {
    index?: Ordinal,
    scaleIndex?: Ordinal,
}

interface CalculateScalePropertiesParameters {
    index: Ordinal,
    options?: CompileNotesOptions,
    scaleIndex: Ordinal,
}

interface ScaleProperties {
    scaleElement: Maybe<NoteAspect>,
    scaleScalar: Scalar,
    scaleTranslation: Translation,
}

export {
    CompileThreadParameters,
    CompileThreadsParameters,
    CompileNotesOptions,
    BuildEntitiesFunction,
    BuildScalesFunction,
    Entity,
    Scale,
    NoteSpec,
    Adjustable,
    NoteAspectSpec,
    CompilePatternParameters,
    Material,
    TimbreNameEnum,
    ScaleProperties,
    CalculateScalePropertiesParameters,
}
