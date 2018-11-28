import { Coordinate, CoordinateElement, Entity, Frequency, Scalar, Scale, Time } from '@musical-patterns/shared'

interface CompileThreadParameters {
    entity: Entity,
    scales: Scale[]
}

interface CompileThreadsParameters {
    entities: Entity[],
    scales: Scale[]
}

type NoteProperty = Time |
    Scalar |
    Frequency |
    Coordinate |
    CoordinateElement

interface CompileNotesOptions {
    scales: Scale[],
}

export {
    CompileThreadParameters,
    CompileThreadsParameters,
    NoteProperty,
    CompileNotesOptions,
}
