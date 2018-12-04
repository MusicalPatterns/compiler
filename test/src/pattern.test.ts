import { ThreadSpec } from '@musical-patterns/performer'
import { BuildEntitiesFunction, compilePattern, Entity, PatternMaterial } from '../../src/indexForTest'

describe('compile pattern', () => {
    it('takes pattern material and produces specs for threads which the performer can perform', async (done: DoneFn) => {
        const buildEntitiesFunction: BuildEntitiesFunction = (): Entity[] =>
            [
                {

                },
            ]

        const material: PatternMaterial = {
            buildEntitiesFunction,
        }

        const actualThreadSpecs: ThreadSpec[] = await compilePattern({ material })

        expect(actualThreadSpecs)
            .toEqual([
                {
                    notes: [],
                    voiceSpec: undefined,
                },
            ])

        done()
    })

    // also takes pattern spec?
})
