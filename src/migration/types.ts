import { Note, TimbreName, VoiceType } from '@musical-patterns/performer'

type NoteOneZeroZero = Note
type TimbreNameOneZeroZero = TimbreName
type VoiceTypeOneZeroZero = VoiceType

interface VoiceSpecOneZeroZero {
    timbre: TimbreNameOneZeroZero,
    voiceType: VoiceTypeOneZeroZero,
}

interface ThreadSpecOneZeroSeven {
    part: NoteOneZeroZero[],
    voiceSpec: VoiceSpecOneZeroZero,
}

interface ThreadSpecOneZeroThirty {
    noteSpecs?: NoteOneZeroZero[],
    voiceSpec?: VoiceSpecOneZeroZero,
}

type OutmodedThreadSpec =
    ThreadSpecOneZeroSeven |
    ThreadSpecOneZeroThirty

enum CompilerVersion {
    '1.0.7' = '1.0.7',
    '1.0.30' = '1.0.30',
}

export {
    OutmodedThreadSpec,
    CompilerVersion,
    ThreadSpecOneZeroSeven,
    ThreadSpecOneZeroThirty,
}
