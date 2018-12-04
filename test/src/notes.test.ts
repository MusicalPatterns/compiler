import { Note } from '@musical-patterns/performer'
import { to } from '@musical-patterns/utilities'
import { compileNote, NoteSpec } from '../../src/indexForTest'

describe('compile note', () => {
    it('works', () => {
        const noteSpec: NoteSpec = {}
        compileNote(noteSpec)
    })

    it('defaults position to a single element array, offset slightly from the origin of a 1D line', () => {
        const noteSpec: NoteSpec = {}
        const note: Note = compileNote(noteSpec)

        expect(note.position)
            .toEqual(to.Coordinate([ 1 ]))
    })
})
