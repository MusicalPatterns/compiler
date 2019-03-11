import { Ms, to } from '@musical-patterns/utilities'
import {
    computeNotesTotalCompiledDuration,
    computePatternTotalCompiledDuration,
    Entity,
    Material,
    Note,
    Scale,
} from '../../../src/indexForTest'

describe('total compiled duration', () => {
    describe('of notes', () => {
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

            const actual: Ms = computeNotesTotalCompiledDuration(notes, scales)

            expect(actual)
                .toBe(to.Ms(17))
        })
    })

    describe('of pattern', () => {
        it(`tells you how long a pattern will be once compiled, taking the LCM of each voice's duration`, async (done: DoneFn) => {
            const firstNotes: Note[] = [
                {
                    duration: {
                        scalar: to.Scalar(2),
                    },
                },
                {
                    duration: {
                        scalar: to.Scalar(3),
                    },
                },
            ]
            const secondNotes: Note[] = [
                {
                    duration: {
                        scalar: to.Scalar(4),
                    },
                },
                {
                    duration: {
                        scalar: to.Scalar(4),
                    },
                },
            ]
            const material: Material = {
                materializeEntities: (): Entity[] => [
                    {
                        notes: firstNotes,
                    },
                    {
                        notes: secondNotes,
                    },
                ],
            }

            const actual: Ms = await computePatternTotalCompiledDuration({ material })

            expect(actual)
                .toBe(to.Ms(40))

            done()
        })

        it('when a voice has no duration, it ignores it in its computation', async (done: DoneFn) => {
            const firstNotes: Note[] = [
                {
                    duration: {
                        scalar: to.Scalar(2),
                    },
                },
                {
                    duration: {
                        scalar: to.Scalar(3),
                    },
                },
            ]
            const secondNotes: Note[] = [
                {
                    duration: {
                        scalar: to.Scalar(0),
                    },
                },
                {
                    duration: {
                        scalar: to.Scalar(0),
                    },
                },
            ]
            const material: Material = {
                materializeEntities: (): Entity[] => [
                    {
                        notes: firstNotes,
                    },
                    {
                        notes: secondNotes,
                    },
                ],
            }

            const actual: Ms = await computePatternTotalCompiledDuration({ material })

            expect(actual)
                .toBe(to.Ms(5))

            done()
        })
    })
})
