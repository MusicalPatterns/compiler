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
    interface TestSpecs {
        testSpec: Scalar,
    }

    let material: Material
    let specs: TestSpecs

    beforeEach(() => {
        const materializeEntities: MaterializeEntities = (specsForEntities: TestSpecs): Entity[] => [
            {
                sections: [
                    {
                        notes: [
                            {
                                duration: { scalar: specsForEntities.testSpec },
                                gain: { scalar: specsForEntities.testSpec },
                                pitch: { scalar: specsForEntities.testSpec },
                                position: { scalar: specsForEntities.testSpec },
                                sustain: { scalar: specsForEntities.testSpec },
                            },
                        ],
                        repetitions: to.Cardinal(8),
                    },
                ],
            },
        ]

        const materializeScales: MaterializeScales = (specsForScales: TestSpecs): Scale[] => [
            {
                scalars: [ specsForScales.testSpec ],
            },
        ]

        material = {
            materializeEntities,
            materializeScales,
        }

        specs = {
            testSpec: to.Scalar(3),
        }
    })

    it('given specs, takes them into account', async (done: DoneFn) => {
        const actualVoices: Voice[] = await compilePattern({ material, specs })

        expect(actualVoices)
            .toEqual([
                {
                    sections: [
                        {
                            repetitions: to.Cardinal(8),
                            sounds: [
                                {
                                    duration: to.Ms(9),
                                    frequency: to.Hz(9),
                                    gain: to.Scalar(9),
                                    position: [ 9, 0, 0 ].map(to.Meters),
                                    sustain: to.Ms(8.9),
                                },
                            ],
                        },
                    ],
                    sourceRequest: undefined,
                },
            ])

        done()
    })

    it('if specs are not explicitly provided to override default, the default is finding the initial specs within the spec key of the pattern, so that you can just pass it a friggin pattern', async (done: DoneFn) => {
        const patternLikeObject: { material: Material, spec: { initialSpecs: TestSpecs } } = {
            material,
            spec: {
                initialSpecs: specs,
            },
        }

        const actualVoices: Voice[] = await compilePattern(patternLikeObject)

        expect(actualVoices)
            .toEqual([
                {
                    sections: [
                        {
                            repetitions: to.Cardinal(8),
                            sounds: [
                                {
                                    duration: to.Ms(9),
                                    frequency: to.Hz(9),
                                    gain: to.Scalar(9),
                                    position: [ 9, 0, 0 ].map(to.Meters),
                                    sustain: to.Ms(8.9),
                                },
                            ],
                        },
                    ],
                    sourceRequest: undefined,
                },
            ])

        done()
    })

    it('prefers the top-level specs provision to the finding it inside spec key of pattern', async (done: DoneFn) => {
        const patternLikeObject: { material: Material, spec: { initialSpecs: TestSpecs } } = {
            material,
            spec: {
                initialSpecs: {
                    testSpec: to.Scalar(293587293873),
                },
            },
        }

        const actualVoices: Voice[] = await compilePattern({ ...patternLikeObject, specs })

        expect(actualVoices)
            .toEqual([
                {
                    sections: [
                        {
                            repetitions: to.Cardinal(8),
                            sounds: [
                                {
                                    duration: to.Ms(9),
                                    frequency: to.Hz(9),
                                    gain: to.Scalar(9),
                                    position: [ 9, 0, 0 ].map(to.Meters),
                                    sustain: to.Ms(8.9),
                                },
                            ],
                        },
                    ],
                    sourceRequest: undefined,
                },
            ])

        done()
    })
})
