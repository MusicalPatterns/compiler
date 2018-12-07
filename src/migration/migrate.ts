import { ThreadSpec } from '@musical-patterns/performer'
import { CompilerVersion, OutmodedThreadSpec } from './types'

const migrate: (outmodedThreadSpecs: OutmodedThreadSpec[], fromCompilerVersion: CompilerVersion) => ThreadSpec[] =
    (outmodedThreadSpecs: OutmodedThreadSpec[], fromCompilerVersion: CompilerVersion): ThreadSpec[] => {
        switch (fromCompilerVersion) {
            case CompilerVersion[ '1.0.7' ]:
                return outmodedThreadSpecs.map((outmodedThreadSpec: OutmodedThreadSpec): ThreadSpec =>
                    ({
                        noteSpecs: outmodedThreadSpec.part,
                        voiceSpec: outmodedThreadSpec.voiceSpec,
                    }))
            default:
                return []
        }
    }

export {
    migrate,
}
