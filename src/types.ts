import { OscillatorName, SampleName } from '@musical-patterns/performer'
import { AnyOtherProperties, Ordinal, Scalar, Translation } from '@musical-patterns/utilities'

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

interface CompilePatternParameters extends AnyOtherProperties {
    material: Material,
    // tslint:disable-next-line no-any
    spec?: any,
    // tslint:disable-next-line no-any
    specData?: { initial: any },
}

// tslint:disable-next-line no-any
type BuildEntitiesFunction = (spec?: any) => Entity[]
// tslint:disable-next-line no-any
type BuildScalesFunction = (spec?: any) => Scale[]

interface Entity {
    noteSpecs?: NoteSpec[],
    // @ts-ignore
    timbreName?: string,
}

interface Scale extends Adjustable {
    scalars?: Scalar[],
}

interface NoteSpec {
    durationSpec?: NotePropertySpec,
    gainSpec?: NotePropertySpec,
    pitchSpec?: NotePropertySpec,
    positionSpec?: NotePropertySpec | NotePropertySpec[],
    sustainSpec?: NotePropertySpec,
}

interface Adjustable {
    scalar?: Scalar,
    translation?: Translation,
}

interface NotePropertySpec extends Adjustable {
    index?: Ordinal,
    scaleIndex?: Ordinal,
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
    NotePropertySpec,
    CompilePatternParameters,
    Material,
    TimbreNameEnum,
}
