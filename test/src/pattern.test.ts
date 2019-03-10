import { Voice } from '@musical-patterns/performer'
import { Scalar, to } from '@musical-patterns/utilities'
import {
    compilePattern,
    Entity,
    Material,
    MaterializeEntities,
    MaterializeScales,
    Scale,
} from '../../src/indexForTest'

describe('compile pattern', () => {
    // tslint:disable-next-line no-type-definitions-outside-types-modules
    interface TestSpec {
        testThing: Scalar,
    }

    let material: Material
    let spec: TestSpec

    beforeEach(() => {
        const materializeEntities: MaterializeEntities = (specForEntities: TestSpec): Entity[] =>
            [
                {
                    notes: [
                        {
                            duration: { scalar: specForEntities.testThing },
                            gain: { scalar: specForEntities.testThing },
                            pitch: { scalar: specForEntities.testThing },
                            position: { scalar: specForEntities.testThing },
                            sustain: { scalar: specForEntities.testThing },
                        },
                    ],
                },
            ]

        const materializeScales: MaterializeScales = (specForScales: TestSpec): Scale[] => [
            {
                scalars: [ specForScales.testThing ],
            },
        ]

        material = {
            materializeEntities,
            materializeScales,
        }

        spec = {
            testThing: to.Scalar(3),
        }
    })

    it('given a spec, takes it into account', async (done: DoneFn) => {
        const actualVoices: Voice[] = await compilePattern({ material, spec })

        expect(actualVoices)
            .toEqual([
                {
                    sounds: [
                        {
                            duration: to.Ms(9),
                            frequency: to.Hz(9),
                            gain: to.Scalar(9),
                            position: [ 9, 0, 0 ].map(to.Meters),
                            sustain: to.Ms(8.9),
                        },
                    ],
                    sourceRequest: undefined,
                },
            ])

        done()
    })

    it('also supports finding the spec as initial within spec data, so that you can just pass it a friggin pattern', async (done: DoneFn) => {
        const patternLikeObject: { data: { initial: TestSpec }, material: Material } = {
            data: {
                initial: spec,
            },
            material,
        }

        const actualVoices: Voice[] = await compilePattern(patternLikeObject)

        expect(actualVoices)
            .toEqual([
                {
                    sounds: [
                        {
                            duration: to.Ms(9),
                            frequency: to.Hz(9),
                            gain: to.Scalar(9),
                            position: [ 9, 0, 0 ].map(to.Meters),
                            sustain: to.Ms(8.9),
                        },
                    ],
                    sourceRequest: undefined,
                },
            ])

        done()
    })

    it('prefers the top-level spec provision to the finding it inside data', async (done: DoneFn) => {
        const patternLikeObject: { data: { initial: TestSpec }, material: Material } = {
            data: {
                initial: {
                    testThing: to.Scalar(293587293873),
                },
            },
            material,
        }

        const actualVoices: Voice[] = await compilePattern({ ...patternLikeObject, spec })

        expect(actualVoices)
            .toEqual([
                {
                    sounds: [
                        {
                            duration: to.Ms(9),
                            frequency: to.Hz(9),
                            gain: to.Scalar(9),
                            position: [ 9, 0, 0 ].map(to.Meters),
                            sustain: to.Ms(8.9),
                        },
                    ],
                    sourceRequest: undefined,
                },
            ])

        done()
    })
})
