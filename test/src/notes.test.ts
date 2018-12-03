import { compileNote, NoteSpec } from '../../src/indexForTest'

describe('compile note', () => {
    it('works', () => {
        const noteSpec: NoteSpec = {}
        compileNote(noteSpec)
    })
})
