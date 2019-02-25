import { TimbreName, VoiceType } from '@musical-patterns/performer'
import { NoteOneZeroZeroThroughOneZeroNinetyfour } from '../1.0.094'

interface VoiceSpecOneZeroZeroThroughOneZeroThirty {
    timbre: TimbreName,
    voiceType: VoiceType,
}

interface ThreadSpecOneZeroSevenThroughOneZeroThirty {
    notes?: NoteOneZeroZeroThroughOneZeroNinetyfour[],
    voiceSpec?: VoiceSpecOneZeroZeroThroughOneZeroThirty,
}

export {
    ThreadSpecOneZeroSevenThroughOneZeroThirty,
    VoiceSpecOneZeroZeroThroughOneZeroThirty,
}
