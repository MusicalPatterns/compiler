// tslint:disable no-any

import { to } from '@musical-patterns/utilities'
import { compileNoteProperty, CompileNotesOptions, NoteProperty, NotePropertySpec, Scale, to as compilerTo } from '../../src/indexForTest'

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

    it('defaults scale index to zero, index to zero, offset to zero, and scalar to zero', () => {
        const notePropertySpec: NotePropertySpec = {}
        const noteProperty: NoteProperty = compileNoteProperty(notePropertySpec, options)

        expect(noteProperty)
            .toBe(compilerTo.NoteProperty(2))
    })

    it('uses index to choose later notes in the scale', () => {
        const notePropertySpec: NotePropertySpec = {
            index: to.Index(2),
        }
        const noteProperty: NoteProperty = compileNoteProperty(notePropertySpec, options)

        expect(noteProperty)
            .toBe(compilerTo.NoteProperty(8))
    })

    it('uses scale index to switch scales', () => {
        const notePropertySpec: NotePropertySpec = {
            scaleIndex: to.Index(1),
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

    it('uses offset to shift around arbitrarily', () => {
        const notePropertySpec: NotePropertySpec = {
            offset: to.Offset(0.1),
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

    it('applies offset from the scale, too', () => {
        const scaleWithOffset: Scale = {
            offset: to.Offset(3),
            scalars: [ 2, 4, 6, 8 ].map(to.Scalar),
        }
        const notePropertySpec: NotePropertySpec = {}
        const noteProperty: NoteProperty = compileNoteProperty(notePropertySpec, { scales: [ scaleWithOffset ] })

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

    it('applies scalar first, then offset', () => {
        const notePropertySpec: NotePropertySpec = {
            offset: to.Offset(0.1),
            scalar: to.Scalar(1.25),
        }
        const noteProperty: NoteProperty = compileNoteProperty(notePropertySpec, options)

        expect(noteProperty)
            .toBe(compilerTo.NoteProperty(2.6))
    })

    it('applies scalar from the scale first, then offset from the scale', () => {
        const notePropertySpec: NotePropertySpec = {}
        const scaleWithScalarAndOffset: Scale = {
            offset: to.Offset(3),
            scalar: to.Scalar(7),
            scalars: [ 2, 4, 6, 8 ].map(to.Scalar),
        }
        const noteProperty: NoteProperty = compileNoteProperty(notePropertySpec, { scales: [ scaleWithScalarAndOffset ] })

        expect(noteProperty)
            .toBe(compilerTo.NoteProperty(17))
    })

    it('can apply offsets and scalars from both scale and the note, scalars first', () => {
        const notePropertySpec: NotePropertySpec = {
            offset: to.Offset(0.1),
            scalar: to.Scalar(1.25),
        }
        const scaleWithScalarAndOffset: Scale = {
            offset: to.Offset(3),
            scalar: to.Scalar(7),
            scalars: [ 2, 4, 6, 8 ].map(to.Scalar),
        }
        const noteProperty: NoteProperty = compileNoteProperty(notePropertySpec, { scales: [ scaleWithScalarAndOffset ] })

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
})
