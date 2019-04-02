import { NON_SEGNO_INDEX, Sound, Voice } from '@musical-patterns/performer'
import { apply, from, indexOfFinalElement, INITIAL, Ms, NEXT, Ordinal, to } from '@musical-patterns/utilities'
import { HAS_NO_REPETEND } from '../constants'
import { ComputeSegnoIndexParameters } from './types'

const computeFirstSoundIndexAfterTime: (sounds: Sound[], timePosition: Ms) => Ordinal =
    (sounds: Sound[], timePosition: Ms): Ordinal => {
        let soundIndex: Ordinal = INITIAL
        let nextStart: Ms = to.Ms(0)
        while (nextStart < timePosition) {
            const nextSound: Sound = apply.Ordinal(sounds, soundIndex)
            const duration: Ms = nextSound.duration
            nextStart = apply.Translation(nextStart, to.Translation(duration))
            soundIndex = apply.Translation(soundIndex, NEXT)

            if (from.Ordinal(soundIndex) > indexOfFinalElement(sounds)) {
                break
            }
        }

        return soundIndex
    }

const computeSegnoIndex: (parameters: {
    collectiveSegnoTime: Ms
    individualSegnoTime: Ms,
    voice: Voice,
}) => Ordinal =
    ({
         collectiveSegnoTime,
         individualSegnoTime,
         voice,
     }: ComputeSegnoIndexParameters): Ordinal =>
        individualSegnoTime === HAS_NO_REPETEND ?
            NON_SEGNO_INDEX :
            computeFirstSoundIndexAfterTime(
                voice.sounds || [],
                collectiveSegnoTime,
            )

export {
    computeSegnoIndex,
}
