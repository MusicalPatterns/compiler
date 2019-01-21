import { Note, TimbreName, VoiceType } from '@musical-patterns/performer'

interface VoiceSpecOneZeroThirty {
    timbre: TimbreName,
    voiceType: VoiceType,
}

interface ThreadSpecOneZeroThirty {
    notes?: Note[],
    voiceSpec?: VoiceSpecOneZeroThirty,
}

export {
    ThreadSpecOneZeroThirty,
    VoiceSpecOneZeroThirty,
}
