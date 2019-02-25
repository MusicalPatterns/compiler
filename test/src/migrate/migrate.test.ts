import { SampleName, ThreadSpec, VoiceType } from '@musical-patterns/performer'
import { to } from '@musical-patterns/utilities'
import {
    CompilerVersion,
    CoordinateOneZeroZeroThroughOneZeroNinetyFour,
    migrate,
    ThreadSpecOneZeroSevenThroughOneZeroThirty,
    ThreadSpecOneZeroThirtyThroughOneZeroNinetyfour,
    ThreadSpecOneZeroZeroThroughOneZeroSeven,
} from '../../../src/indexForTest'

// tslint:disable-next-line no-type-definitions-outside-types-modules
describe('migrate - takes outmoded thread specs and brings them into conformity with the current world', () => {
    it('works for thread specs built by compiler version 1.0.007 - renames part to notes', () => {
        const outmodedThreadSpecs: ThreadSpecOneZeroZeroThroughOneZeroSeven[] = [ {
            part: [
                {
                    duration: to.Ms(2),
                    frequency: to.Hz(2),
                    gain: to.Scalar(2),
                    // tslint:disable-next-line no-any
                    position: [ 2 ] as any as CoordinateOneZeroZeroThroughOneZeroNinetyFour,
                    sustain: to.Ms(2),
                },
            ],
            voiceSpec: {
                timbre: SampleName.PIANO,
                voiceType: VoiceType.SAMPLE,
            },
        } ]

        const updatedThreadSpecs: ThreadSpec[] = migrate(outmodedThreadSpecs, CompilerVersion[ '1.0.007' ])

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

    it('works for thread specs built by compiler version 1.0.030 - renames timbre to timbreName', () => {
        const outmodedThreadSpecs: ThreadSpecOneZeroSevenThroughOneZeroThirty[] = [ {
            notes: [
                {
                    duration: to.Ms(2),
                    frequency: to.Hz(2),
                    gain: to.Scalar(2),
                    // tslint:disable-next-line no-any
                    position: [ 2, 0, 0 ] as any as CoordinateOneZeroZeroThroughOneZeroNinetyFour,
                    sustain: to.Ms(2),
                },
            ],
            voiceSpec: {
                timbre: SampleName.PIANO,
                voiceType: VoiceType.SAMPLE,
            },
        } ]

        const updatedThreadSpecs: ThreadSpec[] = migrate(outmodedThreadSpecs, CompilerVersion[ '1.0.030' ])

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

    it('works for thread specs built by compiler version 1.0.094 - changes type of position from a nominal to a parameterized of units', () => {
        const outmodedThreadSpecs: ThreadSpecOneZeroThirtyThroughOneZeroNinetyfour[] = [ {
            notes: [
                {
                    duration: to.Ms(2),
                    frequency: to.Hz(2),
                    gain: to.Scalar(2),
                    // tslint:disable-next-line no-any
                    position: [ 2, 0, 0 ] as any as CoordinateOneZeroZeroThroughOneZeroNinetyFour,
                    sustain: to.Ms(2),
                },
            ],
            voiceSpec: {
                timbreName: SampleName.PIANO,
                voiceType: VoiceType.SAMPLE,
            },
        } ]

        const updatedThreadSpecs: ThreadSpec[] = migrate(outmodedThreadSpecs, CompilerVersion[ '1.0.094' ])

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
