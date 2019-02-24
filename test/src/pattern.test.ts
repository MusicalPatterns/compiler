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

// tslint:disable-next-line no-type-definitions-outside-types-modules
describe('compile pattern', () => {
    interface TestSpec {
        testThing: Scalar,
    }

    let material: Material
    let spec: TestSpec

    beforeEach(() => {
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

        material = {
            buildEntitiesFunction,
            buildScalesFunction,
        }

        spec = {
            testThing: to.Scalar(3),
        }
    })

    it('given a spec, takes it into account', async (done: DoneFn) => {
        const actualThreadSpecs: ThreadSpec[] = await compilePattern({ material, spec })

        expect(actualThreadSpecs)
            .toEqual([
                {
                    notes: [
                        {
                            duration: to.Ms(9),
                            frequency: to.Hz(9),
                            gain: to.Scalar(9),
                            position: [ 9, 0, 0 ].map(to.Meters),
                            sustain: to.Ms(8.9),
                        },
                    ],
                    voiceSpec: undefined,
                },
            ])

        done()
    })

    it('also supports finding the spec as initial within spec data, so that you can just pass it a friggin pattern', async (done: DoneFn) => {
        const patternLikeObject: { material: Material, specData: { initial: TestSpec } } = {
            material,
            specData: {
                initial: spec,
            },
        }

        const actualThreadSpecs: ThreadSpec[] = await compilePattern(patternLikeObject)

        expect(actualThreadSpecs)
            .toEqual([
                {
                    notes: [
                        {
                            duration: to.Ms(9),
                            frequency: to.Hz(9),
                            gain: to.Scalar(9),
                            position: [ 9, 0, 0 ].map(to.Meters),
                            sustain: to.Ms(8.9),
                        },
                    ],
                    voiceSpec: undefined,
                },
            ])

        done()
    })

    it('prefers the top-level spec provision to the finding it inside data', async (done: DoneFn) => {
        const patternLikeObject: { material: Material, specData: { initial: TestSpec } } = {
            material,
            specData: {
                initial: {
                    testThing: to.Scalar(293587293873),
                },
            },
        }

        const actualThreadSpecs: ThreadSpec[] = await compilePattern({ ...patternLikeObject, spec })

        expect(actualThreadSpecs)
            .toEqual([
                {
                    notes: [
                        {
                            duration: to.Ms(9),
                            frequency: to.Hz(9),
                            gain: to.Scalar(9),
                            position: [ 9, 0, 0 ].map(to.Meters),
                            sustain: to.Ms(8.9),
                        },
                    ],
                    voiceSpec: undefined,
                },
            ])

        done()
    })
})
