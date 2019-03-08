// tslint:disable no-any

import { to } from '@musical-patterns/utilities'
import {
    compileNoteAspect,
    CompileNotesOptions,
    NoteAspect,
    NoteAspectSpec,
    Scale,
    to as compilerTo,
} from '../../src/indexForTest'

describe('compile note aspect', () => {
    let scales: Scale[]
    let options: CompileNotesOptions
    beforeEach(() => {
        scales = [
            {
                scalars: [ 2, 4, 8, 16 ].map(to.Scalar),
            },
            {
                scalars: [ 3, 9, 27, 81 ].map(to.Scalar),
            },
        ]
        options = { scales }
    })

    it('defaults scale index to zero, index to zero, translation to zero, and scalar to zero', () => {
        const noteAspectSpec: NoteAspectSpec = {}
        const noteAspect: NoteAspect = compileNoteAspect(noteAspectSpec, options)

        expect(noteAspect)
            .toBe(compilerTo.NoteAspect(2))
    })

    it('uses index to choose later notes in the scale', () => {
        const noteAspectSpec: NoteAspectSpec = {
            index: to.Ordinal(2),
        }
        const noteAspect: NoteAspect = compileNoteAspect(noteAspectSpec, options)

        expect(noteAspect)
            .toBe(compilerTo.NoteAspect(8))
    })

    it('uses scale index to switch scales', () => {
        const noteAspectSpec: NoteAspectSpec = {
            scaleIndex: to.Ordinal(1),
        }
        const noteAspect: NoteAspect = compileNoteAspect(noteAspectSpec, options)

        expect(noteAspect)
            .toBe(compilerTo.NoteAspect(3))
    })

    it('uses scalar to stretch arbitrarily', () => {
        const noteAspectSpec: NoteAspectSpec = {
            scalar: to.Scalar(1.25),
        }
        const noteAspect: NoteAspect = compileNoteAspect(noteAspectSpec, options)

        expect(noteAspect)
            .toBe(compilerTo.NoteAspect(2.5))
    })

    it('uses translation to shift around arbitrarily', () => {
        const noteAspectSpec: NoteAspectSpec = {
            translation: to.Translation(0.1),
        }
        const noteAspect: NoteAspect = compileNoteAspect(noteAspectSpec, options)

        expect(noteAspect)
            .toBe(compilerTo.NoteAspect(2.1))
    })

    it('defaults to 1 if the scale\'s scalars are empty', () => {
        const noteAspectSpec: NoteAspectSpec = {}
        const noteAspect: NoteAspect = compileNoteAspect(noteAspectSpec, { scales: [ { scalars: [] } ] })

        expect(noteAspect)
            .toBe(compilerTo.NoteAspect(1))
    })

    it('applies translation from the scale, too', () => {
        const scaleWithTranslation: Scale = {
            scalars: [ 2, 4, 6, 8 ].map(to.Scalar),
            translation: to.Translation(3),
        }
        const noteAspectSpec: NoteAspectSpec = {}
        const noteAspect: NoteAspect = compileNoteAspect(noteAspectSpec, { scales: [ scaleWithTranslation ] })

        expect(noteAspect)
            .toBe(compilerTo.NoteAspect(5))
    })

    it('applies scalar from the scale, too', () => {
        const scaleWithScalar: Scale = {
            scalar: to.Scalar(7),
            scalars: [ 2, 4, 6, 8 ].map(to.Scalar),
        }
        const noteAspectSpec: NoteAspectSpec = {}
        const noteAspect: NoteAspect = compileNoteAspect(noteAspectSpec, { scales: [ scaleWithScalar ] })

        expect(noteAspect)
            .toBe(compilerTo.NoteAspect(14))
    })

    it('applies scalar first, then translation', () => {
        const noteAspectSpec: NoteAspectSpec = {
            scalar: to.Scalar(1.25),
            translation: to.Translation(0.1),
        }
        const noteAspect: NoteAspect = compileNoteAspect(noteAspectSpec, options)

        expect(noteAspect)
            .toBe(compilerTo.NoteAspect(2.6))
    })

    it('applies scalar from the scale first, then translation from the scale', () => {
        const noteAspectSpec: NoteAspectSpec = {}
        const scaleWithScalarAndTranslation: Scale = {
            scalar: to.Scalar(7),
            scalars: [ 2, 4, 6, 8 ].map(to.Scalar),
            translation: to.Translation(3),
        }
        const noteAspect: NoteAspect = compileNoteAspect(noteAspectSpec, { scales: [ scaleWithScalarAndTranslation ] })

        expect(noteAspect)
            .toBe(compilerTo.NoteAspect(17))
    })

    it('can apply translations and scalars from both scale and the note, scalars first', () => {
        const noteAspectSpec: NoteAspectSpec = {
            scalar: to.Scalar(1.25),
            translation: to.Translation(0.1),
        }
        const scaleWithScalarAndTranslation: Scale = {
            scalar: to.Scalar(7),
            scalars: [ 2, 4, 6, 8 ].map(to.Scalar),
            translation: to.Translation(3),
        }
        const noteAspect: NoteAspect = compileNoteAspect(noteAspectSpec, { scales: [ scaleWithScalarAndTranslation ] })

        expect(noteAspect)
            .toBe(compilerTo.NoteAspect(20.6))
    })

    it('handles empty scales', () => {
        const noteAspect: NoteAspect = compileNoteAspect({}, { scales: [] })

        expect(noteAspect)
            .toBe(compilerTo.NoteAspect(1))
    })

    it('handles missing scales', () => {
        const noteAspect: NoteAspect = compileNoteAspect({})

        expect(noteAspect)
            .toBe(compilerTo.NoteAspect(1))
    })

    it('rounds, to avoid off by 0.000000000001 errors when comparing patterns compiled on different systems', () => {
        const noteAspectSpec: NoteAspectSpec = {
            translation: to.Translation(0.1239147293578729037982375),
        }
        const noteAspect: NoteAspect = compileNoteAspect(noteAspectSpec, options)

        expect(noteAspect)
            .toBe(compilerTo.NoteAspect(2.12391))
    })
})
