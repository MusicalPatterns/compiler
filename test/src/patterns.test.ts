import { CompiledPattern, OscillatorName, Sound, SourceType } from '@musical-patterns/performer'
import { BEGINNING, NO_DURATION, to } from '@musical-patterns/utilities'
import { compilePattern, Entity, Material, Note, Scale } from '../../src/indexForTest'
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
                segnoTime: BEGINNING,
                totalDuration: to.Ms(9),
                voices: [
                    {
                        delay: NO_DURATION,
                        segnoIndex: to.Ordinal(0),
                        sounds: [ expectedSound ],
                        sourceRequest: {
                            sourceType: SourceType.OSCILLATOR,
                            timbreName: OscillatorName.SINE,
                        },
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
                segnoTime: BEGINNING,
                totalDuration: to.Ms(9),
                voices: [
                    {
                        delay: NO_DURATION,
                        segnoIndex: to.Ordinal(0),
                        sounds: [ expectedSound ],
                        sourceRequest: {
                            sourceType: SourceType.OSCILLATOR,
                            timbreName: OscillatorName.SINE,
                        },
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
                segnoTime: BEGINNING,
                totalDuration: to.Ms(9),
                voices: [
                    {
                        delay: NO_DURATION,
                        segnoIndex: to.Ordinal(0),
                        sounds: [ expectedSound ],
                        sourceRequest: {
                            sourceType: SourceType.OSCILLATOR,
                            timbreName: OscillatorName.SINE,
                        },
                    },
                ],
            })

        done()
    })
})
