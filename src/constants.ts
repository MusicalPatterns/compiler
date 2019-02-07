// tslint:disable no-magic-numbers

import { negative, to, Translation } from '@musical-patterns/utilities'

const DEFAULT_TRANSLATION_FOR_ALMOST_FULL_SUSTAIN: Translation = to.Translation(negative(0.1))

const COMPILER_PRECISION: number = 5

export {
    COMPILER_PRECISION,
    DEFAULT_TRANSLATION_FOR_ALMOST_FULL_SUSTAIN,
}
