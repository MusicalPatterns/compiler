import { NON_SEGNO_INDEX, NON_SEGNO_TIME, Sound, Voice } from '@musical-patterns/performer'
import {
    apply,
    BEGINNING,
    from,
    indexOfFinalElement,
    INITIAL,
    isEmpty,
    Ms,
    NEXT,
    Ordinal,
    to,
} from '@musical-patterns/utilities'
import { ComputeSegnoIndexParameters } from './types'

const computeFirstSoundIndexAfterTime: (sounds: Sound[], timePosition: Ms) => Ordinal =
    (sounds: Sound[], timePosition: Ms): Ordinal => {
        if (isEmpty(sounds)) {
            throw new Error('there will be no sound index if the sounds are empty')
        }

        let soundIndex: Ordinal = INITIAL
        let nextStart: Ms = BEGINNING
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
        individualSegnoTime === NON_SEGNO_TIME ?
            NON_SEGNO_INDEX :
            computeFirstSoundIndexAfterTime(
                voice.sounds || [],
                collectiveSegnoTime,
            )

export {
    computeSegnoIndex,
}
