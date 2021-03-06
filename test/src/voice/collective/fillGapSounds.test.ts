import { Sound } from '@musical-patterns/performer'
import { Ms, to } from '@musical-patterns/utilities'
import { computeFillGapSounds } from '../../../../src/indexForTest'

describe('compute fill gap sounds', () => {
    it('keeps cycling over the repetend sounds until it has filled the gap of duration', () => {
        const repetendSounds: Sound[] = [
            {
                duration: to.Ms(5),
                frequency: to.Hz(1),
                gain: to.Scalar(1),
                position: [ 0, 0, 0 ].map(to.Meters),
                sustain: to.Ms(4.9),
            },
            {
                duration: to.Ms(6),
                frequency: to.Hz(1),
                gain: to.Scalar(1),
                position: [ 0, 0, 0 ].map(to.Meters),
                sustain: to.Ms(4.9),
            },
        ]
        const gapToBeFilled: Ms = to.Ms(27)

        const actualSounds: Sound[] = computeFillGapSounds(repetendSounds, gapToBeFilled)

        expect(actualSounds)
            .toEqual([
                {
                    duration: to.Ms(5),
                    frequency: to.Hz(1),
                    gain: to.Scalar(1),
                    position: [ 0, 0, 0 ].map(to.Meters),
                    sustain: to.Ms(4.9),
                },
                {
                    duration: to.Ms(6),
                    frequency: to.Hz(1),
                    gain: to.Scalar(1),
                    position: [ 0, 0, 0 ].map(to.Meters),
                    sustain: to.Ms(4.9),
                },
                {
                    duration: to.Ms(5),
                    frequency: to.Hz(1),
                    gain: to.Scalar(1),
                    position: [ 0, 0, 0 ].map(to.Meters),
                    sustain: to.Ms(4.9),
                },
                {
                    duration: to.Ms(6),
                    frequency: to.Hz(1),
                    gain: to.Scalar(1),
                    position: [ 0, 0, 0 ].map(to.Meters),
                    sustain: to.Ms(4.9),
                },
                {
                    duration: to.Ms(5),
                    frequency: to.Hz(1),
                    gain: to.Scalar(1),
                    position: [ 0, 0, 0 ].map(to.Meters),
                    sustain: to.Ms(4.9),
                },
            ])
    })
})
