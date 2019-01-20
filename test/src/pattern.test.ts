import { ThreadSpec } from '@musical-patterns/performer'
import { Scalar, to } from '@musical-patterns/utilities'
import {
    BuildEntitiesFunction,
    BuildScalesFunction,
    compilePattern,
    Entity,
    Material,
    Scale,
} from '../../src/indexForTest'

// tslint:disable-next-line:no-type-definitions-outside-types-modules
describe('compile pattern', () => {
    it('given a spec, takes it into account', async (done: DoneFn) => {
        interface TestSpec {
            testThing: Scalar,
        }

        const buildEntitiesFunction: BuildEntitiesFunction = (specForEntities: TestSpec): Entity[] =>
            [
                {
                    noteSpecs: [
                        {
                            durationSpec: { scalar: specForEntities.testThing },
                            gainSpec: { scalar: specForEntities.testThing },
                            pitchSpec: { scalar: specForEntities.testThing },
                            positionSpec: { scalar: specForEntities.testThing },
                            sustainSpec: { scalar: specForEntities.testThing },
                        },
                    ],
                },
            ]

        const buildScalesFunction: BuildScalesFunction = (specForScales: TestSpec): Scale[] => [
            {
                scalars: [ specForScales.testThing ],
            },
        ]

        const material: Material = {
            buildEntitiesFunction,
            buildScalesFunction,
        }

        const spec: TestSpec = {
            testThing: to.Scalar(3),
        }

        const actualThreadSpecs: ThreadSpec[] = await compilePattern({ material, spec })

        expect(actualThreadSpecs)
            .toEqual([
                {
                    notes: [
                        {
                            duration: to.Time(9),
                            frequency: to.Frequency(9),
                            gain: to.Scalar(9),
                            position: to.Coordinate([ 9, 0, 0 ]),
                            sustain: to.Time(8.1),
                        },
                    ],
                    voiceSpec: undefined,
                },
            ])

        done()
    })
})
