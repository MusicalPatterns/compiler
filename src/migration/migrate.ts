import { OscillatorName, ThreadSpec, TimbreName, VoiceType } from '@musical-patterns/performer'
import { CompilerVersion, OutmodedThreadSpec, ThreadSpecOneZeroSeven, ThreadSpecOneZeroThirty } from './types'

const migrate: (outmodedThreadSpecs: OutmodedThreadSpec[], fromCompilerVersion: CompilerVersion) => ThreadSpec[] =
    (outmodedThreadSpecs: OutmodedThreadSpec[], fromCompilerVersion: CompilerVersion): ThreadSpec[] => {
        let updatingThreadSpecs: OutmodedThreadSpec[] = outmodedThreadSpecs

        if (fromCompilerVersion >= CompilerVersion[ '1.0.7' ]) {
            const oneZeroSevenThreadSpecs: ThreadSpecOneZeroSeven[] = updatingThreadSpecs as ThreadSpecOneZeroSeven[]
            updatingThreadSpecs = oneZeroSevenThreadSpecs.map(
                (oneZeroSevenThreadSpec: ThreadSpecOneZeroSeven): OutmodedThreadSpec => ({
                    notes: oneZeroSevenThreadSpec.part,
                    voiceSpec: oneZeroSevenThreadSpec.voiceSpec,
                }))
        }

        if (fromCompilerVersion >= CompilerVersion[ '1.0.30' ]) {
            const oneZeroThirtyThreadSpecs: ThreadSpecOneZeroThirty[] = updatingThreadSpecs as ThreadSpecOneZeroThirty[]
            updatingThreadSpecs = oneZeroThirtyThreadSpecs.map(
                (oneZeroThirtyThreadSpec: ThreadSpecOneZeroThirty): ThreadSpec => {
                    const timbreName: TimbreName = oneZeroThirtyThreadSpec.voiceSpec ?
                        // tslint:disable-next-line:no-unsafe-any
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

        return updatingThreadSpecs as ThreadSpec[]
    }

export {
    migrate,
}
