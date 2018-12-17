import { ThreadSpec } from '@musical-patterns/performer'
import { CompilerVersion, OutmodedThreadSpec, ThreadSpecOneZeroSeven, ThreadSpecOneZeroThirty } from './types'

const migrate: (outmodedThreadSpecs: OutmodedThreadSpec[], fromCompilerVersion: CompilerVersion) => ThreadSpec[] =
    (outmodedThreadSpecs: OutmodedThreadSpec[], fromCompilerVersion: CompilerVersion): ThreadSpec[] => {
        let updatingThreadSpecs: OutmodedThreadSpec[] = outmodedThreadSpecs

        if (fromCompilerVersion >= CompilerVersion[ '1.0.7' ]) {
            const oneZeroSevenThreadSpecs: ThreadSpecOneZeroSeven[] = updatingThreadSpecs as ThreadSpecOneZeroSeven[]
            updatingThreadSpecs = oneZeroSevenThreadSpecs.map(
                (oneZeroSevenThreadSpec: ThreadSpecOneZeroSeven): ThreadSpec =>
                    ({
                        noteSpecs: oneZeroSevenThreadSpec.part,
                        voiceSpec: oneZeroSevenThreadSpec.voiceSpec,
                    }))
        }

        if (fromCompilerVersion >= CompilerVersion[ '1.0.30' ]) {
            const oneZeroThirtyThreadSpecs: ThreadSpecOneZeroThirty[] = updatingThreadSpecs as ThreadSpecOneZeroThirty[]
            updatingThreadSpecs = oneZeroThirtyThreadSpecs.map(
                (oneZeroThirtyThreadSpec: ThreadSpecOneZeroThirty): ThreadSpec =>
                    ({
                        noteSpecs: oneZeroThirtyThreadSpec.noteSpecs,
                        voiceSpec: {
                            timbreName: oneZeroThirtyThreadSpec.voiceSpec && oneZeroThirtyThreadSpec.voiceSpec.timbre,
                            voiceType: oneZeroThirtyThreadSpec.voiceSpec && oneZeroThirtyThreadSpec.voiceSpec.voiceType,
                        },
                    }))
        }

        return updatingThreadSpecs as ThreadSpec[]
    }

export {
    migrate,
}
