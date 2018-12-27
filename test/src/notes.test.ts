// tslint:disable:no-unsafe-any

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

        it('position to the origin', () => {
            expect(note.position)
                .toEqual(to.Coordinate([ 0, 0, 0 ]))
        })

        it('sustain to 0.9', () => {
            expect(note.sustain)
                .toBe(to.Time(0.9))
        })
    })

    describe('adding dimensions to the position until it is 3D', () => {
        it('works when using a non-array position', () => {
            const noteSpec: NoteSpec = {
                positionSpec: {
                    scalar: to.Scalar(3),
                },
            }
            const note: Note = compileNote(noteSpec)

            expect(note.position)
                .toEqual(to.Coordinate([ 3, 0, 0 ]))
        })

        it('works for a single element position', () => {
            const noteSpec: NoteSpec = {
                positionSpec: [
                    {
                        scalar: to.Scalar(3),
                    },
                ],
            }
            const note: Note = compileNote(noteSpec)

            expect(note.position)
                .toEqual(to.Coordinate([ 3, 0, 0 ]))
        })

        it('works for a two element position', () => {
            const noteSpec: NoteSpec = {
                positionSpec: [
                    {
                        scalar: to.Scalar(3),
                    },
                    {
                        scalar: to.Scalar(2),
                    },
                ],
            }
            const note: Note = compileNote(noteSpec)

            expect(note.position)
                .toEqual(to.Coordinate([ 3, 2, 0 ]))
        })
    })

    describe('sustain', () => {
        it('caps sustain at slightly less than the duration', () => {
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
                .toEqual(to.Time(2.7))
        })

        it('defaults sustain to slightly less than the duration', () => {
            const noteSpec: NoteSpec = {
                durationSpec: {
                    scalar: to.Scalar(3),
                },
            }

            const note: Note = compileNote(noteSpec)

            expect(note.duration)
                .toEqual(to.Time(3))
            expect(note.sustain)
                .toEqual(to.Time(2.7))
        })

        it('uses sustain if given and less than duration', () => {
            const noteSpec: NoteSpec = {
                durationSpec: {
                    scalar: to.Scalar(3),
                },
                sustainSpec: {
                    scalar: to.Scalar(2),
                },
            }

            const note: Note = compileNote(noteSpec)

            expect(note.duration)
                .toEqual(to.Time(3))
            expect(note.sustain)
                .toEqual(to.Time(2))
        })
    })
})
