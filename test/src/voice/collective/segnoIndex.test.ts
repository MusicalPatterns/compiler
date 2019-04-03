import { NON_SEGNO_INDEX, Voice } from '@musical-patterns/performer'
import { Ms, Ordinal, repeat, to } from '@musical-patterns/utilities'
import { computeSegnoIndex } from '../../../../src/indexForTest'

describe('compute segno index', () => {
    const collectiveSegnoTime: Ms = to.Ms(44)
    const voice: Voice = {
        sounds: repeat(
            [
                {
                    duration: to.Ms(20),
                    frequency: to.Hz(1),
                    gain: to.Scalar(1),
                    position: [ 0 ].map(to.Meters),
                    sustain: to.Ms(9),
                },
            ],
            to.Cardinal(5),
        ),
    }
    let individualSegnoTime: Ms

    describe('when the voice has no repetend', () => {
        beforeEach(() => {
            individualSegnoTime = to.Ms(-1)
        })

        it('it returns the non-segno-index which will tell the performer not to repeat it', () => {
            const actualSegnoIndex: Ordinal = computeSegnoIndex({
                collectiveSegnoTime,
                individualSegnoTime,
                voice,
            })

            expect(actualSegnoIndex)
                .toBe(NON_SEGNO_INDEX)
        })
    })

    describe('when the voice does have a repetend', () => {
        beforeEach(() => {
            const SOME_REALISTIC_BUT_MOSTLY_ARBITRARY_INDIVIDUAL_SEGNO_TIME: Ms = to.Ms(60)
            individualSegnoTime = SOME_REALISTIC_BUT_MOSTLY_ARBITRARY_INDIVIDUAL_SEGNO_TIME
        })

        it('returns the first index of the voice sounds after the collective segno time', () => {
            const actualSegnoIndex: Ordinal = computeSegnoIndex({
                collectiveSegnoTime,
                individualSegnoTime,
                voice,
            })

            expect(actualSegnoIndex)
                .toBe(to.Ordinal(3))
        })
    })

    describe('when the voice has no sounds', () => {
        beforeEach(() => {
            const ANY_SEGNO_TIME_OTHER_THAN_NON_SEGNO_TIME: Ms = to.Ms(35)
            individualSegnoTime = ANY_SEGNO_TIME_OTHER_THAN_NON_SEGNO_TIME
        })

        it('returns the non segno index', () => {
            const actualSegnoIndex: Ordinal = computeSegnoIndex({
                collectiveSegnoTime,
                individualSegnoTime,
                voice: {
                    sounds: [],
                },
            })

            expect(actualSegnoIndex)
                .toBe(to.Ordinal(-1))
        })
    })
})
