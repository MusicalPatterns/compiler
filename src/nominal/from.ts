// tslint:disable:variable-name no-any

import { NoteProperty } from './types'

const NoteProperty: (noteProperty: NoteProperty) => number =
    (noteProperty: NoteProperty): number => noteProperty as any

export {
    NoteProperty,
}
