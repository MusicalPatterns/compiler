import { Ms, to } from '@musical-patterns/utilities'
import { calculatePatternTotalCompiledDuration, Entity, Material, NoteSpec } from '../../../src/indexForTest'

describe('calculate pattern total compiled duration', () => {
    it(`tells you how long a pattern will be once compiled, taking the LCM of each thread's duration`, async (done: DoneFn) => {
        const firstNoteSpecs: NoteSpec[] = [
            {
                durationSpec: {
                    scalar: to.Scalar(2),
                },
            },
            {
                durationSpec: {
                    scalar: to.Scalar(3),
                },
            },
        ]
        const secondNoteSpecs: NoteSpec[] = [
            {
                durationSpec: {
                    scalar: to.Scalar(4),
                },
            },
            {
                durationSpec: {
                    scalar: to.Scalar(4),
                },
            },
        ]
        const material: Material = {
            buildEntitiesFunction: (): Entity[] => [
                {
                    noteSpecs: firstNoteSpecs,
                },
                {
                    noteSpecs: secondNoteSpecs,
                },
            ],
        }

        const actual: Ms = await calculatePatternTotalCompiledDuration({ material })

        expect(actual)
            .toBe(to.Ms(40))

        done()
    })

    it('when a thread has no duration, it ignores it in its calculation', async (done: DoneFn) => {
        const firstNoteSpecs: NoteSpec[] = [
            {
                durationSpec: {
                    scalar: to.Scalar(2),
                },
            },
            {
                durationSpec: {
                    scalar: to.Scalar(3),
                },
            },
        ]
        const secondNoteSpecs: NoteSpec[] = [
            {
                durationSpec: {
                    scalar: to.Scalar(0),
                },
            },
            {
                durationSpec: {
                    scalar: to.Scalar(0),
                },
            },
        ]
        const material: Material = {
            buildEntitiesFunction: (): Entity[] => [
                {
                    noteSpecs: firstNoteSpecs,
                },
                {
                    noteSpecs: secondNoteSpecs,
                },
            ],
        }

        const actual: Ms = await calculatePatternTotalCompiledDuration({ material })

        expect(actual)
            .toBe(to.Ms(5))

        done()
    })
})
