// tslint:disable variable-name no-any

import { NoteProperty } from './types'

const NoteProperty: (noteProperty: number) => NoteProperty =
    (noteProperty: number): NoteProperty => noteProperty as any

export {
    NoteProperty,
}
