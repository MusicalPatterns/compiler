import { Note, VoiceSpec } from '@musical-patterns/performer'

interface ThreadSpecOneZeroSeven {
    part: Note[],
    voiceSpec: VoiceSpec,
}

type OutmodedThreadSpec =
    ThreadSpecOneZeroSeven

enum CompilerVersion {
    '1.0.7' = '1.0.7',
}

export {
    OutmodedThreadSpec,
    CompilerVersion,
    ThreadSpecOneZeroSeven,
}
