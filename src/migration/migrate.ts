import { Note, OscillatorName, ThreadSpec, TimbreName, VoiceType } from '@musical-patterns/performer'
import { to } from '@musical-patterns/utilities'
import { ThreadSpecOneZeroZeroThroughOneZeroSeven } from './1.0.007'
import { ThreadSpecOneZeroSevenThroughOneZeroThirty } from './1.0.030'
import {
    CoordinateElementOneZeroZeroThroughOneZeroNinetyFour,
    NoteOneZeroZeroThroughOneZeroNinetyfour,
    ThreadSpecOneZeroThirtyThroughOneZeroNinetyfour,
} from './1.0.094'
import { CompilerVersion, OutmodedThreadSpec } from './types'

const migrate: (outmodedThreadSpecs: OutmodedThreadSpec[], fromCompilerVersion: CompilerVersion) => ThreadSpec[] =
    (outmodedThreadSpecs: OutmodedThreadSpec[], fromCompilerVersion: CompilerVersion): ThreadSpec[] => {
        let updatingThreadSpecs: OutmodedThreadSpec[] = outmodedThreadSpecs

        if (fromCompilerVersion <= CompilerVersion[ '1.0.007' ]) {
            const oneZeroSevenThreadSpecs: ThreadSpecOneZeroZeroThroughOneZeroSeven[] =
                updatingThreadSpecs as ThreadSpecOneZeroZeroThroughOneZeroSeven[]
            updatingThreadSpecs = oneZeroSevenThreadSpecs.map(
                (oneZeroSevenThreadSpec: ThreadSpecOneZeroZeroThroughOneZeroSeven): OutmodedThreadSpec => ({
                    notes: oneZeroSevenThreadSpec.part,
                    voiceSpec: oneZeroSevenThreadSpec.voiceSpec,
                }))
        }

        if (fromCompilerVersion <= CompilerVersion[ '1.0.030' ]) {
            const oneZeroThirtyThreadSpecs: ThreadSpecOneZeroSevenThroughOneZeroThirty[] =
                updatingThreadSpecs as ThreadSpecOneZeroSevenThroughOneZeroThirty[]
            updatingThreadSpecs = oneZeroThirtyThreadSpecs.map(
                (oneZeroThirtyThreadSpec: ThreadSpecOneZeroSevenThroughOneZeroThirty): OutmodedThreadSpec => {
                    const timbreName: TimbreName = oneZeroThirtyThreadSpec.voiceSpec ?
                        oneZeroThirtyThreadSpec.voiceSpec.timbre :
                        OscillatorName.SINE
                    const voiceType: VoiceType = oneZeroThirtyThreadSpec.voiceSpec ?
                        oneZeroThirtyThreadSpec.voiceSpec.voiceType :
                        VoiceType.SAMPLE

                    return {
                        notes: oneZeroThirtyThreadSpec.notes,
                        voiceSpec: {
                            timbreName,
                            voiceType,
                        },
                    }
                })
        }

        if (fromCompilerVersion <= CompilerVersion[ '1.0.094' ]) {
            const oneZeroThirtyThreadSpecs: ThreadSpecOneZeroThirtyThroughOneZeroNinetyfour[] =
                updatingThreadSpecs as ThreadSpecOneZeroThirtyThroughOneZeroNinetyfour[]
            updatingThreadSpecs = oneZeroThirtyThreadSpecs.map(
                (oneZeroNinetyfourThreadSpec: ThreadSpecOneZeroThirtyThroughOneZeroNinetyfour): ThreadSpec => ({
                    notes: oneZeroNinetyfourThreadSpec.notes && oneZeroNinetyfourThreadSpec.notes.map(
                        (oneZeroNinetyfourNote: NoteOneZeroZeroThroughOneZeroNinetyfour): Note => ({
                            ...oneZeroNinetyfourNote,
                            position: (oneZeroNinetyfourNote.position).map(
                                (positionElement: CoordinateElementOneZeroZeroThroughOneZeroNinetyFour) =>
                                    // tslint:disable-next-line no-any
                                    to.Meters(positionElement as any as number)),
                        }),
                    ),
                    voiceSpec: oneZeroNinetyfourThreadSpec.voiceSpec,
                }))
        }

        return updatingThreadSpecs as ThreadSpec[]
    }

export {
    migrate,
}
