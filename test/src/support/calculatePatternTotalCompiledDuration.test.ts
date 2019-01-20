import { Time, to } from '@musical-patterns/utilities'
import { calculatePatternTotalCompiledDuration, Entity, Material, NoteSpec } from '../../../src/indexForTest'

describe('calculate pattern total compiled duration', () => {
    it('tells you how long a pattern will be once compiled', async (done: DoneFn) => {
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

        const actual: Time = await calculatePatternTotalCompiledDuration({ material })

        expect(actual)
            .toBe(to.Time(40))

        done()
    })
})
