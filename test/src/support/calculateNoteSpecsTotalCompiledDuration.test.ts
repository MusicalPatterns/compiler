import { Time, to } from '@musical-patterns/utilities'
import { calculateNoteSpecsTotalCompiledDuration, NoteSpec, Scale } from '../../../src/indexForTest'

describe('calculate note specs total compiled duration', () => {
    it('tells you how long a set of note specs are going to last once compiled', () => {
        const noteSpecs: NoteSpec[] = [
            {
                durationSpec: {
                    scalar: to.Scalar(2),
                },
            },
            {
                durationSpec: {
                    index: to.Index(1),
                },
            },
        ]
        const scales: Scale[] = [
            { scalars: [ 5, 7 ].map(to.Scalar) },
        ]

        const actual: Time = calculateNoteSpecsTotalCompiledDuration(noteSpecs, scales)

        expect(actual)
            .toBe(to.Time(17))
    })
})