import { ThreadSpecOneZeroThirty } from './1.0.30'
import { ThreadSpecOneZeroSeven } from './1.0.7'

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
