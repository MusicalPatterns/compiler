import { SampleName, ThreadSpec, VoiceType } from '@musical-patterns/performer'
import { to } from '@musical-patterns/utilities'
import { CompilerVersion, migrate, ThreadSpecOneZeroSeven } from '../../../src/indexForTest'

describe('migrate - takes outmoded thread specs and brings them into conformity with the current world', () => {
    it('works for thread specs built by compiler version 7', () => {
        const outmodedThreadSpecs: ThreadSpecOneZeroSeven[] = [ {
            part: [
                {
                    duration: to.Time(2),
                    frequency: to.Frequency(2),
                    gain: to.Scalar(2),
                    position: to.Coordinate([ 2 ]),
                    sustain: to.Time(2),
                },
            ],
            voiceSpec: {
                timbre: SampleName.PIANO,
                voiceType: VoiceType.SAMPLE,
            },
        } ]

        const updatedThreadSpecs: ThreadSpec = migrate(outmodedThreadSpecs, CompilerVersion[ '1.0.7' ])

        expect(updatedThreadSpecs)
            .toEqual([
                {
                    noteSpecs: [
                        {
                            duration: to.Time(2),
                            frequency: to.Frequency(2),
                            gain: to.Scalar(2),
                            position: to.Coordinate([ 2 ]),
                            sustain: to.Time(2),
                        },
                    ],
                    voiceSpec: {
                        timbre: SampleName.PIANO,
                        voiceType: VoiceType.SAMPLE,
                    },
                },
            ])
    })
})
