// tslint:disable no-any

import { to } from '@musical-patterns/utilities'
import {
    compileNoteProperty,
    CompileNotesOptions,
    NoteProperty,
    NotePropertySpec,
    Scale,
    to as compilerTo,
} from '../../src/indexForTest'

describe('compile note property', () => {
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
        const notePropertySpec: NotePropertySpec = {}
        const noteProperty: NoteProperty = compileNoteProperty(notePropertySpec, options)

        expect(noteProperty)
            .toBe(compilerTo.NoteProperty(2))
    })

    it('uses index to choose later notes in the scale', () => {
        const notePropertySpec: NotePropertySpec = {
            index: to.Ordinal(2),
        }
        const noteProperty: NoteProperty = compileNoteProperty(notePropertySpec, options)

        expect(noteProperty)
            .toBe(compilerTo.NoteProperty(8))
    })

    it('uses scale index to switch scales', () => {
        const notePropertySpec: NotePropertySpec = {
            scaleIndex: to.Ordinal(1),
        }
        const noteProperty: NoteProperty = compileNoteProperty(notePropertySpec, options)

        expect(noteProperty)
            .toBe(compilerTo.NoteProperty(3))
    })

    it('uses scalar to stretch arbitrarily', () => {
        const notePropertySpec: NotePropertySpec = {
            scalar: to.Scalar(1.25),
        }
        const noteProperty: NoteProperty = compileNoteProperty(notePropertySpec, options)

        expect(noteProperty)
            .toBe(compilerTo.NoteProperty(2.5))
    })

    it('uses translation to shift around arbitrarily', () => {
        const notePropertySpec: NotePropertySpec = {
            translation: to.Translation(0.1),
        }
        const noteProperty: NoteProperty = compileNoteProperty(notePropertySpec, options)

        expect(noteProperty)
            .toBe(compilerTo.NoteProperty(2.1))
    })

    it('defaults to 1 if the scale\'s scalars are empty', () => {
        const notePropertySpec: NotePropertySpec = {}
        const noteProperty: NoteProperty = compileNoteProperty(notePropertySpec, { scales: [ { scalars: [] } ] })

        expect(noteProperty)
            .toBe(compilerTo.NoteProperty(1))
    })

    it('applies translation from the scale, too', () => {
        const scaleWithTranslation: Scale = {
            scalars: [ 2, 4, 6, 8 ].map(to.Scalar),
            translation: to.Translation(3),
        }
        const notePropertySpec: NotePropertySpec = {}
        const noteProperty: NoteProperty = compileNoteProperty(notePropertySpec, { scales: [ scaleWithTranslation ] })

        expect(noteProperty)
            .toBe(compilerTo.NoteProperty(5))
    })

    it('applies scalar from the scale, too', () => {
        const scaleWithScalar: Scale = {
            scalar: to.Scalar(7),
            scalars: [ 2, 4, 6, 8 ].map(to.Scalar),
        }
        const notePropertySpec: NotePropertySpec = {}
        const noteProperty: NoteProperty = compileNoteProperty(notePropertySpec, { scales: [ scaleWithScalar ] })

        expect(noteProperty)
            .toBe(compilerTo.NoteProperty(14))
    })

    it('applies scalar first, then translation', () => {
        const notePropertySpec: NotePropertySpec = {
            scalar: to.Scalar(1.25),
            translation: to.Translation(0.1),
        }
        const noteProperty: NoteProperty = compileNoteProperty(notePropertySpec, options)

        expect(noteProperty)
            .toBe(compilerTo.NoteProperty(2.6))
    })

    it('applies scalar from the scale first, then translation from the scale', () => {
        const notePropertySpec: NotePropertySpec = {}
        const scaleWithScalarAndTranslation: Scale = {
            scalar: to.Scalar(7),
            scalars: [ 2, 4, 6, 8 ].map(to.Scalar),
            translation: to.Translation(3),
        }
        const noteProperty: NoteProperty = compileNoteProperty(notePropertySpec, { scales: [ scaleWithScalarAndTranslation ] })

        expect(noteProperty)
            .toBe(compilerTo.NoteProperty(17))
    })

    it('can apply translations and scalars from both scale and the note, scalars first', () => {
        const notePropertySpec: NotePropertySpec = {
            scalar: to.Scalar(1.25),
            translation: to.Translation(0.1),
        }
        const scaleWithScalarAndTranslation: Scale = {
            scalar: to.Scalar(7),
            scalars: [ 2, 4, 6, 8 ].map(to.Scalar),
            translation: to.Translation(3),
        }
        const noteProperty: NoteProperty = compileNoteProperty(notePropertySpec, { scales: [ scaleWithScalarAndTranslation ] })

        expect(noteProperty)
            .toBe(compilerTo.NoteProperty(20.6))
    })

    it('handles empty scales', () => {
        const noteProperty: NoteProperty = compileNoteProperty({}, { scales: [] })

        expect(noteProperty)
            .toBe(compilerTo.NoteProperty(1))
    })

    it('handles missing scales', () => {
        const noteProperty: NoteProperty = compileNoteProperty({})

        expect(noteProperty)
            .toBe(compilerTo.NoteProperty(1))
    })

    it('rounds, to avoid off by 0.000000000001 errors when comparing patterns compiled on different systems', () => {
        const notePropertySpec: NotePropertySpec = {
            translation: to.Translation(0.1239147293578729037982375),
        }
        const noteProperty: NoteProperty = compileNoteProperty(notePropertySpec, options)

        expect(noteProperty)
            .toBe(compilerTo.NoteProperty(2.12391))
    })
})
