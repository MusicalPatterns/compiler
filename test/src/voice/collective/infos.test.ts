import { to } from '@musical-patterns/utilities'
import { CollectiveVoiceInfos, computeCollectiveInfos, IndividualVoiceAndInfo } from '../../../../src/indexForTest'

describe('compute collective infos', () => {
    it('works with a mix of forever repeating and non-forever-repeating voices', () => {
        const individualVoicesAndInfos: IndividualVoiceAndInfo[] = [
            {
                voice: {},
                voiceInfo: {
                    individualEndTime: to.Ms(5),
                    individualRepetendDuration: to.Ms(4),
                    individualSegnoTime: to.Ms(1),
                    sectionInfos: [],
                },
            },
            {
                voice: {},
                voiceInfo: {
                    individualEndTime: to.Ms(3),
                    individualRepetendDuration: to.Ms(3),
                    individualSegnoTime: to.Ms(0),
                    sectionInfos: [],
                },
            },
            {
                voice: {},
                voiceInfo: {
                    individualEndTime: to.Ms(9),
                    individualRepetendDuration: to.Ms(0),
                    individualSegnoTime: to.Ms(-1),
                    sectionInfos: [],
                },
            },
        ]

        const collectiveVoiceInfos: CollectiveVoiceInfos = computeCollectiveInfos(individualVoicesAndInfos)

        expect(collectiveVoiceInfos)
            .toEqual({
                collectiveEndTime: to.Ms(13),
                collectiveRepetendDuration: to.Ms(12),
                collectiveSegnoTime: to.Ms(1),
                collectiveShareSegnoTime: false,
            })
    })

    it('correctly identifies when voices share a segno time', () => {
        const individualVoicesAndInfos: IndividualVoiceAndInfo[] = [
            {
                voice: {},
                voiceInfo: {
                    individualEndTime: to.Ms(5),
                    individualRepetendDuration: to.Ms(4),
                    individualSegnoTime: to.Ms(1),
                    sectionInfos: [],
                },
            },
            {
                voice: {},
                voiceInfo: {
                    individualEndTime: to.Ms(4),
                    individualRepetendDuration: to.Ms(3),
                    individualSegnoTime: to.Ms(1),
                    sectionInfos: [],
                },
            },
        ]

        const collectiveVoiceInfos: CollectiveVoiceInfos = computeCollectiveInfos(individualVoicesAndInfos)

        expect(collectiveVoiceInfos)
            .toEqual({
                collectiveEndTime: to.Ms(13),
                collectiveRepetendDuration: to.Ms(12),
                collectiveSegnoTime: to.Ms(1),
                collectiveShareSegnoTime: true,
            })
    })
})
