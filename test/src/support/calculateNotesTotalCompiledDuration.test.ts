import { Ms, to } from '@musical-patterns/utilities'
import { calculateNotesTotalCompiledDuration, Note, Scale } from '../../../src/indexForTest'

describe('calculate notes total compiled duration', () => {
    it('tells you how long a set of note are going to last once compiled', () => {
        const notes: Note[] = [
            {
                duration: {
                    scalar: to.Scalar(2),
                },
            },
            {
                duration: {
                    index: to.Ordinal(1),
                },
            },
        ]
        const scales: Scale[] = [
            { scalars: [ 5, 7 ].map(to.Scalar) },
        ]

        const actual: Ms = calculateNotesTotalCompiledDuration(notes, scales)

        expect(actual)
            .toBe(to.Ms(17))
    })
})
