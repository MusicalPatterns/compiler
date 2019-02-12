import { Coordinate, Hz, Meters, Ms, Scalar } from '@musical-patterns/utilities'

type NoteProperty =
    Ms |
    Scalar |
    Hz |
    Coordinate<Meters> |
    Meters

export {
    NoteProperty,
}
