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
                            position: to.Coordinate([ 9, 0, 0 ]),
                            sustain: to.Time(9),
                        },
                    ],
                    voiceSpec: undefined,
                },
            ])

        done()
    })
})
