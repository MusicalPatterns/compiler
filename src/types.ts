// tslint:disable:max-file-line-count

import { OscillatorName, SampleName } from '@musical-patterns/performer'
import {
    AnyOtherProperties,
    Coordinate,
    CoordinateElement,
    Frequency,
    Index,
    Offset,
    Scalar,
    Time,
} from '@musical-patterns/utilities'

// tslint:disable-next-line:variable-name typedef
const TimbreName = {
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

type NoteProperty =
    Time |
    Scalar |
    Frequency |
    Coordinate |
    CoordinateElement

interface CompileNotesOptions {
    scales?: Scale[],
}

interface PatternMaterial {
    buildEntitiesFunction: BuildEntitiesFunction,
    buildScalesFunction?: BuildScalesFunction,
}

interface CompilePatternParameters extends AnyOtherProperties {
    material: PatternMaterial,
    // tslint:disable-next-line:no-any
    spec?: any,
}

// tslint:disable-next-line:no-any
type BuildEntitiesFunction = (patternSpec?: any) => Entity[]
// tslint:disable-next-line:no-any
type BuildScalesFunction = (patternSpec?: any) => Scale[]

interface Entity {
    partSpec?: PartSpec,
    // @ts-ignore
    timbreName?: string,
}

interface Scale extends Adjustable {
    scalars: Scalar[],
}

interface NoteSpec {
    durationSpec?: NotePropertySpec,
    gainSpec?: NotePropertySpec,
    pitchSpec?: NotePropertySpec,
    positionSpec?: NotePropertySpec | NotePropertySpec[],
    sustainSpec?: NotePropertySpec,
}

type PartSpec = NoteSpec[]

interface Adjustable {
    offset?: Offset,
    scalar?: Scalar,
}

interface NotePropertySpec extends Adjustable {
    index?: Index,
    scaleIndex?: Index,
}

export {
    CompileThreadParameters,
    CompileThreadsParameters,
    NoteProperty,
    CompileNotesOptions,
    BuildEntitiesFunction,
    BuildScalesFunction,
    Entity,
    Scale,
    NoteSpec,
    PartSpec,
    Adjustable,
    NotePropertySpec,
    CompilePatternParameters,
    PatternMaterial,
    TimbreName,
}
