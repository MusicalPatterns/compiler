import { Ms, to } from '@musical-patterns/utilities'
import { calculatePatternTotalCompiledDuration, Entity, Material, Note } from '../../../src/indexForTest'

describe('calculate pattern total compiled duration', () => {
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

        const actual: Ms = await calculatePatternTotalCompiledDuration({ material })

        expect(actual)
            .toBe(to.Ms(40))

        done()
    })

    it('when a voice has no duration, it ignores it in its calculation', async (done: DoneFn) => {
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

        const actual: Ms = await calculatePatternTotalCompiledDuration({ material })

        expect(actual)
            .toBe(to.Ms(5))

        done()
    })
})
