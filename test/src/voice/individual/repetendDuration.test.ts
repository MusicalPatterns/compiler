import { Ms, Ordinal, to } from '@musical-patterns/utilities'
import { computeIndividualRepetendDuration, SectionInfo } from '../../../../src/indexForTest'

describe('compute individual repetend duration', () => {
    it('gives the total duration for the section which is the repetend', () => {
        const individualRepetendIndex: Ordinal = to.Ordinal(2)
        const sectionInfos: SectionInfo[] = [
            {
                doesRepeatForever: false,
                totalDuration: to.Ms(45),
            },
            {
                doesRepeatForever: false,
                totalDuration: to.Ms(643),
            },
            {
                doesRepeatForever: true,
                totalDuration: to.Ms(7),
            },
        ]

        const actualIndividualRepetendDuration: Ms = computeIndividualRepetendDuration({
            individualRepetendIndex,
            sectionInfos,
        })

        expect(actualIndividualRepetendDuration)
            .toBe(to.Ms(7))
    })

    it('when the voice has no repetend, is zero', () => {
        const individualRepetendIndex: Ordinal = to.Ordinal(-1)
        const sectionInfos: SectionInfo[] = [
            {
                doesRepeatForever: false,
                totalDuration: to.Ms(45),
            },
            {
                doesRepeatForever: false,
                totalDuration: to.Ms(643),
            },
            {
                doesRepeatForever: false,
                totalDuration: to.Ms(7),
            },
        ]

        const actualIndividualRepetendDuration: Ms = computeIndividualRepetendDuration({
            individualRepetendIndex,
            sectionInfos,
        })

        expect(actualIndividualRepetendDuration)
            .toBe(to.Ms(0))
    })

    it('when the section infos are empty, is zero', () => {
        const individualRepetendIndex: Ordinal = to.Ordinal(2)
        const sectionInfos: SectionInfo[] = []

        const actualIndividualRepetendDuration: Ms = computeIndividualRepetendDuration({
            individualRepetendIndex,
            sectionInfos,
        })

        expect(actualIndividualRepetendDuration)
            .toBe(to.Ms(0))
    })
})
