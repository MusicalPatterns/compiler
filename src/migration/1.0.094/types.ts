import { VoiceSpec } from '@musical-patterns/performer'
import { Hz, Ms, Scalar } from '@musical-patterns/utilities'

// tslint:disable-next-line ban-types
type CoordinateElementOneZeroZeroThroughOneZeroNinetyFour = Number & { _CoordinateElementBrand: void }

type CoordinateOneZeroZeroThroughOneZeroNinetyFour = CoordinateElementOneZeroZeroThroughOneZeroNinetyFour[]

interface NoteOneZeroZeroThroughOneZeroNinetyfour {
    duration: Ms,
    frequency: Hz,
    gain: Scalar,
    playbackRate?: Scalar,
    position: CoordinateOneZeroZeroThroughOneZeroNinetyFour,
    sustain: Ms,
}

interface ThreadSpecOneZeroThirtyThroughOneZeroNinetyfour {
    notes?: NoteOneZeroZeroThroughOneZeroNinetyfour[],
    voiceSpec?: VoiceSpec,
}

export {
    NoteOneZeroZeroThroughOneZeroNinetyfour,
    ThreadSpecOneZeroThirtyThroughOneZeroNinetyfour,
    CoordinateOneZeroZeroThroughOneZeroNinetyFour,
    CoordinateElementOneZeroZeroThroughOneZeroNinetyFour,
}
