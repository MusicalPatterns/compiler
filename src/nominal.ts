// tslint:disable ban-types no-type-definitions-outside-types-modules no-any

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
    Ms |
    Scalar |
    Hz |
    Coordinate<Meters> |
    Meters

const { to, from } = buildNominalInterface({
    number: {
        NoteProperty: DUMMY_VALUE_FOR_BUILDING_NOMINAL_INTERFACE as any as NoteProperty,
    },
})

export {
    to,
    from,
    NoteProperty,
}
