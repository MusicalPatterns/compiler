import { ThreadSpec } from '@musical-patterns/performer'
import { ThreadSpecOneZeroZeroThroughOneZeroSeven } from './1.0.007'
import { ThreadSpecOneZeroSevenThroughOneZeroThirty } from './1.0.030'
import { ThreadSpecOneZeroThirtyThroughOneZeroNinetyfour } from './1.0.094'

type OutmodedThreadSpec =
    ThreadSpecOneZeroZeroThroughOneZeroSeven |
    ThreadSpecOneZeroSevenThroughOneZeroThirty |
    ThreadSpecOneZeroThirtyThroughOneZeroNinetyfour |
    ThreadSpec

enum CompilerVersion {
    '1.0.007' = '1.0.007',
    '1.0.030' = '1.0.030',
    '1.0.094' = '1.0.094',
}

export {
    OutmodedThreadSpec,
    CompilerVersion,
}
