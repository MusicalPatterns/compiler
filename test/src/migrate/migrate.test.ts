import { SampleName, ThreadSpec, VoiceType } from '@musical-patterns/performer'
import { to } from '@musical-patterns/utilities'
import { CompilerVersion, migrate, ThreadSpecOneZeroSeven, ThreadSpecOneZeroThirty } from '../../../src/indexForTest'

describe('migrate - takes outmoded thread specs and brings them into conformity with the current world', () => {
    it('works for thread specs built by compiler version 1.0.7', () => {
        const outmodedThreadSpecs: ThreadSpecOneZeroSeven[] = [ {
            part: [
                {
                    duration: to.Ms(2),
                    frequency: to.Hz(2),
                    gain: to.Scalar(2),
                    position: [ 2 ].map(to.Meters),
                    sustain: to.Ms(2),
                },
            ],
            voiceSpec: {
                timbre: SampleName.PIANO,
                voiceType: VoiceType.SAMPLE,
            },
        } ]

        const updatedThreadSpecs: ThreadSpec[] = migrate(outmodedThreadSpecs, CompilerVersion[ '1.0.7' ])

        expect(updatedThreadSpecs)
            .toEqual([
                {
                    notes: [
                        {
                            duration: to.Ms(2),
                            frequency: to.Hz(2),
                            gain: to.Scalar(2),
                            position: [ 2 ].map(to.Meters),
                            sustain: to.Ms(2),
                        },
                    ],
                    voiceSpec: {
                        timbreName: SampleName.PIANO,
                        voiceType: VoiceType.SAMPLE,
                    },
                },
            ])
    })

    it('works for thread specs built by compiler version 1.0.30', () => {
        const outmodedThreadSpecs: ThreadSpecOneZeroThirty[] = [ {
            notes: [
                {
                    duration: to.Ms(2),
                    frequency: to.Hz(2),
                    gain: to.Scalar(2),
                    position: [ 2, 0, 0 ].map(to.Meters),
                    sustain: to.Ms(2),
                },
            ],
            voiceSpec: {
                timbre: SampleName.PIANO,
                voiceType: VoiceType.SAMPLE,
            },
        } ]

        const updatedThreadSpecs: ThreadSpec[] = migrate(outmodedThreadSpecs, CompilerVersion[ '1.0.30' ])

        expect(updatedThreadSpecs)
            .toEqual([
                {
                    notes: [
                        {
                            duration: to.Ms(2),
                            frequency: to.Hz(2),
                            gain: to.Scalar(2),
                            position: [ 2, 0, 0 ].map(to.Meters),
                            sustain: to.Ms(2),
                        },
                    ],
                    voiceSpec: {
                        timbreName: SampleName.PIANO,
                        voiceType: VoiceType.SAMPLE,
                    },
                },
            ])
    })
})
