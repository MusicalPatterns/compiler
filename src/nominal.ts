// tslint:disable ban-types no-any

import {
    buildNominalInterface,
    Coordinate,
    DUMMY_VALUE_FOR_BUILDING_NOMINAL_INTERFACE,
    Hz,
    Meters,
    Ms,
    Scalar,
} from '@musical-patterns/utilities'

type NoteProperty =
    (
        // tslint:disable-next-line max-union-size
        Ms |
        Scalar |
        Hz |
        Coordinate<Meters> |
        Meters
        ) & Number

const { to, from } = buildNominalInterface({
    number: {
        NoteProperty: DUMMY_VALUE_FOR_BUILDING_NOMINAL_INTERFACE as NoteProperty,
    },
})

export {
    to,
    from,
    NoteProperty,
}
