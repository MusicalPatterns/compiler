import { Coordinate, CoordinateElement, Hz, Ms, Scalar } from '@musical-patterns/utilities'

type NoteProperty =
    Ms |
    Scalar |
    Hz |
    Coordinate |
    CoordinateElement

export {
    NoteProperty,
}
