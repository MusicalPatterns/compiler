import { NON_SEGNO_INDEX, Sound } from '@musical-patterns/performer'
import { INITIAL, to } from '@musical-patterns/utilities'
import { CompiledPattern, compilePattern, Entity, Material, Note, Scale } from '../../src/indexForTest'
import { TestSpecs } from '../support'

describe('compile pattern', () => {
    const specs: TestSpecs = {
        testSpec: to.Scalar(3),
    }

    const testNote: (testSpecs: TestSpecs) => Note =
        (testSpecs: TestSpecs): Note => ({
            duration: { scalar: testSpecs.testSpec },
            gain: { scalar: testSpecs.testSpec },
            pitch: { scalar: testSpecs.testSpec },
            position: { scalar: testSpecs.testSpec },
            sustain: { scalar: testSpecs.testSpec },
        })
    const expectedSound: Sound = {
        duration: to.Ms(9),
        frequency: to.Hz(9),
        gain: to.Scalar(9),
        position: [ 9, 0, 0 ].map(to.Meters),
        sustain: to.Ms(8.9),
    }

    const otherTestNote: (testSpecs: TestSpecs) => Note =
        (testSpecs: TestSpecs): Note => ({
            duration: { scalar: testSpecs.testSpec },
            gain: { scalar: to.Scalar(0) },
            pitch: { scalar: testSpecs.testSpec },
            position: { scalar: testSpecs.testSpec },
            sustain: { scalar: testSpecs.testSpec },
        })
    const otherExpectedSound: Sound = {
        duration: to.Ms(9),
        frequency: to.Hz(9),
        gain: to.Scalar(0),
        position: [ 9, 0, 0 ].map(to.Meters),
        sustain: to.Ms(8.9),
    }

    const otherOtherTestNote: (testSpecs: TestSpecs) => Note =
        (testSpecs: TestSpecs): Note => ({
            duration: { scalar: testSpecs.testSpec },
            gain: { scalar: testSpecs.testSpec },
            pitch: { scalar: to.Scalar(0) },
            position: { scalar: testSpecs.testSpec },
            sustain: { scalar: testSpecs.testSpec },
        })
    const otherOtherExpectedSound: Sound = {
        duration: to.Ms(9),
        frequency: to.Hz(0),
        gain: to.Scalar(9),
        position: [ 9, 0, 0 ].map(to.Meters),
        sustain: to.Ms(8.9),
    }

    const material: Material = {
        materializeEntities: (): Entity[] => [],
        materializeScales: (testSpecs: TestSpecs): Scale[] => [
            {
                scalars: [ testSpecs.testSpec ],
            },
        ],
    }

    beforeEach(() => {
        material.materializeEntities = (testSpecs: TestSpecs): Entity[] => [
            {
                sections: [
                    {
                        notes: [
                            testNote(testSpecs),
                        ],
                    },
                ],
            },
        ]
    })

    it('given specs, takes them into account', async (done: DoneFn) => {
        const actualCompiledPattern: CompiledPattern = await compilePattern({ material, specs })

        expect(actualCompiledPattern)
            .toEqual({
                segnoTime: to.Ms(0),
                totalDuration: to.Ms(9),
                voices: [
                    {
                        segnoIndex: to.Ordinal(0),
                        sounds: [ expectedSound ],
                        sourceRequest: undefined,
                    },
                ],
            })

        done()
    })

    it('if specs are not explicitly provided to override default, the default is finding the initial specs within the spec key of the pattern, so that you can just pass it a friggin pattern', async (done: DoneFn) => {
        const patternLikeObject: { material: Material, spec: { initialSpecs: TestSpecs } } = {
            material,
            spec: {
                initialSpecs: specs,
            },
        }

        const actualCompiledPattern: CompiledPattern = await compilePattern(patternLikeObject)

        expect(actualCompiledPattern)
            .toEqual({
                segnoTime: to.Ms(0),
                totalDuration: to.Ms(9),
                voices: [
                    {
                        segnoIndex: to.Ordinal(0),
                        sounds: [ expectedSound ],
                        sourceRequest: undefined,
                    },
                ],
            })

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

        const actualCompiledPattern: CompiledPattern = await compilePattern({ ...patternLikeObject, specs })

        expect(actualCompiledPattern)
            .toEqual({
                segnoTime: to.Ms(0),
                totalDuration: to.Ms(9),
                voices: [
                    {
                        segnoIndex: to.Ordinal(0),
                        sounds: [ expectedSound ],
                        sourceRequest: undefined,
                    },
                ],
            })

        done()
    })

    describe('segno index and gap filling', () => {
        describe('when all entities enumerate their repetitions i.e. the song ends instead of repeating forever', () => {
            it('each voice has a segno index of -1 indicating for the performer to stop updating it when it reaches its end', async (done: DoneFn) => {
                material.materializeEntities = (testSpecs: TestSpecs): Entity[] => [
                    {
                        sections: [
                            {
                                notes: [
                                    otherTestNote(testSpecs),
                                    testNote(testSpecs),
                                ],
                                repetitions: to.Cardinal(3),
                            },
                        ],
                    },
                    {
                        sections: [
                            {
                                notes: [
                                    testNote(testSpecs),
                                    otherTestNote(testSpecs),
                                ],
                                repetitions: to.Cardinal(2),
                            },
                        ],
                    },
                ]

                const actualCompiledPattern: CompiledPattern = await compilePattern({ material, specs })

                expect(actualCompiledPattern)
                    .toEqual({
                        segnoTime: to.Ms(-1),
                        totalDuration: to.Ms(54),
                        voices: [
                            {
                                segnoIndex: NON_SEGNO_INDEX,
                                sounds: [
                                    otherExpectedSound,
                                    expectedSound,
                                    otherExpectedSound,
                                    expectedSound,
                                    otherExpectedSound,
                                    expectedSound,
                                ],
                                sourceRequest: undefined,
                            },
                            {
                                segnoIndex: NON_SEGNO_INDEX,
                                sounds: [
                                    expectedSound,
                                    otherExpectedSound,
                                    expectedSound,
                                    otherExpectedSound,
                                ],
                                sourceRequest: undefined,
                            },
                        ],
                    })

                done()
            })
        })

        describe('when some entities repeat forever but others do not', () => {
            it('the voices which do not repeat forever have segno indices of -1 and the ones which do repeat forever have a segno index of their first note which comes after the time position where all voices which eventually repeat forever start doing so', async (done: DoneFn) => {
                material.materializeEntities = (testSpecs: TestSpecs): Entity[] => [
                    {
                        sections: [
                            {
                                notes: [
                                    testNote(testSpecs),
                                ],
                                repetitions: to.Cardinal(4),
                            },
                        ],
                    },
                    {
                        sections: [
                            {
                                notes: [
                                    otherOtherTestNote(testSpecs),
                                ],
                                repetitions: to.Cardinal(3),
                            },
                            {
                                notes: [
                                    otherTestNote(testSpecs),
                                    testNote(testSpecs),
                                ],
                            },
                        ],
                    },
                    {
                        sections: [
                            {
                                notes: [
                                    testNote(testSpecs),
                                    otherTestNote(testSpecs),
                                ],
                            },
                        ],
                    },
                ]

                const actualCompiledPattern: CompiledPattern = await compilePattern({ material, specs })

                expect(actualCompiledPattern)
                    .toEqual({
                        segnoTime: to.Ms(27),
                        totalDuration: to.Ms(45),
                        voices: [
                            {
                                segnoIndex: NON_SEGNO_INDEX,
                                sounds: [
                                    expectedSound,
                                    expectedSound,
                                    expectedSound,
                                    expectedSound,
                                ],
                                sourceRequest: undefined,
                            },
                            {
                                segnoIndex: to.Ordinal(3),
                                sounds: [
                                    otherOtherExpectedSound,
                                    otherOtherExpectedSound,
                                    otherOtherExpectedSound,
                                    otherExpectedSound,
                                    expectedSound,
                                ],
                                sourceRequest: undefined,
                            },
                            {
                                segnoIndex: to.Ordinal(3),
                                sounds: [
                                    expectedSound,
                                    otherExpectedSound,
                                    expectedSound,
                                    otherExpectedSound,
                                    expectedSound,
                                ],
                                sourceRequest: undefined,
                            },
                        ],
                    })

                done()
            })
        })

        describe('when all entities repeat forever but some have intro sections', () => {
            it('each voice has a segno index of their first note which comes after the time position where the pattern as a whole starts to repeat, plus voices that are repeating need to be extended to fill out the gap until the end of the section that will be repeating which is the length of the LCM of all the repeating segments', async (done: DoneFn) => {
                material.materializeEntities = (testSpecs: TestSpecs): Entity[] => [
                    {
                        sections: [
                            {
                                notes: [
                                    testNote(testSpecs),
                                ],
                                repetitions: to.Cardinal(1),
                            },
                            {
                                notes: [
                                    otherTestNote(testSpecs),
                                    testNote(testSpecs),
                                    testNote(testSpecs),
                                    testNote(testSpecs),
                                    testNote(testSpecs),
                                ],
                            },
                        ],
                    },
                    {
                        sections: [
                            {
                                notes: [
                                    otherTestNote(testSpecs),
                                    testNote(testSpecs),
                                ],
                            },
                        ],
                    },
                ]

                const actualCompiledPattern: CompiledPattern = await compilePattern({ material, specs })

                expect(actualCompiledPattern)
                    .toEqual({
                        segnoTime: to.Ms(9),
                        totalDuration: to.Ms(99),
                        voices: [
                            {
                                segnoIndex: to.Ordinal(1),
                                sounds: [
                                    expectedSound,
                                    otherExpectedSound,
                                    expectedSound,
                                    expectedSound,
                                    expectedSound,
                                    expectedSound,
                                    otherExpectedSound,
                                    expectedSound,
                                    expectedSound,
                                    expectedSound,
                                    expectedSound,
                                ],
                                sourceRequest: undefined,
                            },
                            {
                                segnoIndex: to.Ordinal(1),
                                sounds: [
                                    otherExpectedSound,
                                    expectedSound,
                                    otherExpectedSound,
                                    expectedSound,
                                    otherExpectedSound,
                                    expectedSound,
                                    otherExpectedSound,
                                    expectedSound,
                                    otherExpectedSound,
                                    expectedSound,
                                    otherExpectedSound,
                                ],
                                sourceRequest: undefined,
                            },
                        ],
                    })

                done()
            })
        })

        describe('when all entities repeat forever and some have intro sections but the intro sections are all the same length such that the collective repetend begins simultaneously', () => {
            it('there is no need to extend to fill the gap', async (done: DoneFn) => {
                material.materializeEntities = (testSpecs: TestSpecs): Entity[] => [
                    {
                        sections: [
                            {
                                notes: [
                                    otherOtherTestNote(testSpecs),
                                ],
                                repetitions: to.Cardinal(3),
                            },
                            {
                                notes: [
                                    otherTestNote(testSpecs),
                                    testNote(testSpecs),
                                    testNote(testSpecs),
                                    testNote(testSpecs),
                                    testNote(testSpecs),
                                ],
                            },
                        ],
                    },
                    {
                        sections: [
                            {
                                notes: [
                                    otherOtherTestNote(testSpecs),
                                    testNote(testSpecs),
                                    otherOtherTestNote(testSpecs),
                                ],
                                repetitions: to.Cardinal(1),
                            },
                            {
                                notes: [
                                    otherTestNote(testSpecs),
                                    testNote(testSpecs),
                                ],
                            },
                        ],
                    },
                ]

                const actualCompiledPattern: CompiledPattern = await compilePattern({ material, specs })

                expect(actualCompiledPattern)
                    .toEqual({
                        segnoTime: to.Ms(27),
                        totalDuration: to.Ms(117),
                        voices: [
                            {
                                segnoIndex: to.Ordinal(3),
                                sounds: [
                                    otherOtherExpectedSound,
                                    otherOtherExpectedSound,
                                    otherOtherExpectedSound,
                                    otherExpectedSound,
                                    expectedSound,
                                    expectedSound,
                                    expectedSound,
                                    expectedSound,
                                    // Listener will see before time repeats in playroom: otherExpectedSound,
                                    // Listener will see before time repeats in playroom: expectedSound,
                                    // Listener will see before time repeats in playroom: expectedSound,
                                    // Listener will see before time repeats in playroom: expectedSound,
                                    // Listener will see before time repeats in playroom: expectedSound,
                                ],
                                sourceRequest: undefined,
                            },
                            {
                                segnoIndex: to.Ordinal(3),
                                sounds: [
                                    otherOtherExpectedSound,
                                    expectedSound,
                                    otherOtherExpectedSound,
                                    otherExpectedSound,
                                    expectedSound,
                                    // Listener will see before time repeats in playroom: otherExpectedSound,
                                    // Listener will see before time repeats in playroom: expectedSound,
                                    // Listener will see before time repeats in playroom: otherExpectedSound,
                                    // Listener will see before time repeats in playroom: expectedSound,
                                    // Listener will see before time repeats in playroom: otherExpectedSound,
                                    // Listener will see before time repeats in playroom: expectedSound,
                                ],
                                sourceRequest: undefined,
                            },
                        ],
                    })

                done()
            })
        })

        describe('when all entities repeat forever from the beginning (from their initial, and if not their only section they are wasting space)', () => {
            it('each voice has a segno index of 0', async (done: DoneFn) => {
                material.materializeEntities = (testSpecs: TestSpecs): Entity[] => [
                    {
                        sections: [
                            {
                                notes: [
                                    otherTestNote(testSpecs),
                                    testNote(testSpecs),
                                ],
                            },
                        ],
                    },
                    {
                        sections: [
                            {
                                notes: [
                                    otherTestNote(testSpecs),
                                    testNote(testSpecs),
                                    testNote(testSpecs),
                                ],
                            },
                        ],
                    },
                ]

                const actualCompiledPattern: CompiledPattern = await compilePattern({ material, specs })

                expect(actualCompiledPattern)
                    .toEqual({
                        segnoTime: to.Ms(0),
                        totalDuration: to.Ms(54),
                        voices: [
                            {
                                segnoIndex: INITIAL,
                                sounds: [
                                    otherExpectedSound,
                                    expectedSound,
                                    // Listener will see before time repeats in playroom: otherExpectedSound,
                                    // Listener will see before time repeats in playroom: expectedSound,
                                    // Listener will see before time repeats in playroom: otherExpectedSound,
                                    // Listener will see before time repeats in playroom: expectedSound,
                                ],
                                sourceRequest: undefined,
                            },
                            {
                                segnoIndex: INITIAL,
                                sounds: [
                                    otherExpectedSound,
                                    expectedSound,
                                    expectedSound,
                                    // Listener will see before time repeats in playroom: otherExpectedSound,
                                    // Listener will see before time repeats in playroom: expectedSound,
                                    // Listener will see before time repeats in playroom: expectedSound
                                ],
                                sourceRequest: undefined,
                            },
                        ],
                    })

                done()
            })
        })
    })
})
