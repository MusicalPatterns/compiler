import { OscillatorName, SampleName, ThreadSpec, VoiceType } from '@musical-patterns/performer'
import { Scalar, to } from '@musical-patterns/utilities'
import {
    BuildEntitiesFunction,
    BuildScalesFunction,
    compilePattern,
    Entity,
    PatternMaterial,
    Scale,
    TimbreName,
} from '../../src/indexForTest'

// tslint:disable-next-line:no-type-definitions-outside-types-modules
describe('compile pattern', () => {
    it('takes pattern material, calls its build functions, using the results to produce specs for threads which the performer can perform', async (done: DoneFn) => {
        const buildEntitiesFunction: BuildEntitiesFunction = (): Entity[] =>
            [
                {
                    noteSpecs: [
                        {
                            durationSpec: { scalar: to.Scalar(3) },
                            gainSpec: { scalar: to.Scalar(3) },
                            pitchSpec: { scalar: to.Scalar(3) },
                            positionSpec: { scalar: to.Scalar(3) },
                            sustainSpec: { scalar: to.Scalar(3) },
                        },
                        {
                            durationSpec: { scalar: to.Scalar(2) },
                            gainSpec: { scalar: to.Scalar(2) },
                            pitchSpec: { scalar: to.Scalar(2) },
                            positionSpec: { scalar: to.Scalar(2) },
                            sustainSpec: { scalar: to.Scalar(2) },
                        },
                    ],
                    timbreName: TimbreName.SINE,
                },
                {
                    noteSpecs: [
                        {
                            durationSpec: {
                                index: to.Index(4),
                                scaleIndex: to.Index(1),
                            },
                            gainSpec: {
                                index: to.Index(1),
                                scaleIndex: to.Index(2),
                            },
                            pitchSpec: {
                                index: to.Index(2),
                                scaleIndex: to.Index(1),
                            },
                            positionSpec: {
                                index: to.Index(3),
                                scaleIndex: to.Index(2),
                            },
                            sustainSpec: {
                                index: to.Index(0),
                                scaleIndex: to.Index(1),
                            },
                        },
                    ],
                    timbreName: TimbreName.KICK,
                },
            ]

        const buildScalesFunction: BuildScalesFunction = (): Scale[] => [
            {
                scalars: [ 1 ].map(to.Scalar),
            },
            {
                scalars: [ 3, 5, 7, 11, 13 ].map(to.Scalar),
            },
            {
                scalars: [ 2, 4, 6, 8, 10 ].map(to.Scalar),
            },
        ]

        const material: PatternMaterial = {
            buildEntitiesFunction,
            buildScalesFunction,
        }

        const actualThreadSpecs: ThreadSpec[] = await compilePattern({ material })

        expect(actualThreadSpecs)
            .toEqual([
                {
                    notes: [
                        {
                            duration: to.Time(3),
                            frequency: to.Frequency(3),
                            gain: to.Scalar(3),
                            position: to.Coordinate([ 3 ]),
                            sustain: to.Time(3),
                        },
                        {
                            duration: to.Time(2),
                            frequency: to.Frequency(2),
                            gain: to.Scalar(2),
                            position: to.Coordinate([ 2 ]),
                            sustain: to.Time(2),
                        },
                    ],
                    voiceSpec: {
                        timbre: OscillatorName.SINE,
                        voiceType: VoiceType.OSCILLATOR,
                    },
                },
                {
                    notes: [
                        {
                            duration: to.Time(13),
                            frequency: to.Frequency(7),
                            gain: to.Scalar(4),
                            position: to.Coordinate([ 8 ]),
                            sustain: to.Time(3),
                        },
                    ],
                    voiceSpec: {
                        timbre: SampleName.KICK,
                        voiceType: VoiceType.SAMPLE,
                    },
                },
            ])

        done()
    })

    it('given a pattern spec, takes it into account', async (done: DoneFn) => {
        interface TestPatternSpec {
            testThing: Scalar,
        }

        const buildEntitiesFunction: BuildEntitiesFunction = (patternSpec: TestPatternSpec): Entity[] =>
            [
                {
                    noteSpecs: [
                        {
                            durationSpec: { scalar: patternSpec.testThing },
                            gainSpec: { scalar: patternSpec.testThing },
                            pitchSpec: { scalar: patternSpec.testThing },
                            positionSpec: { scalar: patternSpec.testThing },
                            sustainSpec: { scalar: patternSpec.testThing },
                        },
                    ],
                },
            ]

        const buildScalesFunction: BuildScalesFunction = (patternSpec: TestPatternSpec): Scale[] => [
            {
                scalars: [ patternSpec.testThing ],
            },
        ]

        const material: PatternMaterial = {
            buildEntitiesFunction,
            buildScalesFunction,
        }

        const spec: TestPatternSpec = {
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
                            position: to.Coordinate([ 9 ]),
                            sustain: to.Time(9),
                        },
                    ],
                    voiceSpec: undefined,
                },
            ])

        done()
    })
})
