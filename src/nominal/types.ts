import { Coordinate, CoordinateElement, Frequency, Scalar, Time } from '@musical-patterns/utilities'

type NoteProperty =
    Time |
    Scalar |
    Frequency |
    Coordinate |
    CoordinateElement

export {
    NoteProperty,
}
