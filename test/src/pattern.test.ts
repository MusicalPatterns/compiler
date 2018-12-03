import { compilePattern, PatternMaterial, BuildEntitiesFunction, Entity } from '../../src/indexForTest'
import { ThreadSpec } from '@musical-patterns/performer'

describe('compile pattern', () => {
    it('takes pattern material and produces specs for threads which the performer can perform', async (done: DoneFn) => {
        const buildEntitiesFunction: BuildEntitiesFunction = (): Entity[] => {
            return [
                {

                }
            ]
        }

        const material: PatternMaterial = {
            buildEntitiesFunction,
        }

        const actualThreadSpecs: ThreadSpec[] = await compilePattern({ material })

        expect(actualThreadSpecs)
            .toEqual([
                {
                    notes: [],
                    voiceSpec: undefined,
                }
            ])

        done()
    })

    // also takes pattern spec?
})
