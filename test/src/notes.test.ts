import { Note } from '@musical-patterns/performer'
import { to } from '@musical-patterns/utilities'
import { compileNote, NoteSpec } from '../../src/indexForTest'

describe('compile note', () => {
    describe('defaults', () => {
        let note: Note
        beforeEach(() => {
            const noteSpec: NoteSpec = {}
            note = compileNote(noteSpec)
        })

        it('duration to 1', () => {
            expect(note.duration)
                .toBe(to.Time(1))
        })

        it('gain to 1', () => {
            expect(note.gain)
                .toBe(to.Scalar(1))
        })

        it('frequency to 1', () => {
            expect(note.frequency)
                .toBe(to.Frequency(1))
        })

        it('position to a single element array, offset slightly from the origin of a 1D line', () => {
            expect(note.position)
                .toEqual(to.Coordinate([ 1 ]))
        })

        it('sustain to 1', () => {
            expect(note.sustain)
                .toBe(to.Time(1))
        })
    })

    it('caps sustain at the duration', () => {
        const noteSpec: NoteSpec = {
            durationSpec: {
                scalar: to.Scalar(3),
            },
            sustainSpec: {
                scalar: to.Scalar(8),
            },
        }
        const note: Note = compileNote(noteSpec)

        expect(note.duration)
            .toEqual(to.Time(3))
        expect(note.sustain)
            .toEqual(to.Time(3))
    })
})
