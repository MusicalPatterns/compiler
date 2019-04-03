import { to } from '@musical-patterns/utilities'
import { computeIndividualVoiceAndInfo, HAS_NO_REPETEND, IndividualVoiceAndInfo } from '../../../../src/indexForTest'

describe('compute individual voice and info', () => {
    it('defaults', () => {
        const actualVoiceAndInfo: IndividualVoiceAndInfo = computeIndividualVoiceAndInfo({ entity: {} })

        expect(actualVoiceAndInfo)
            .toEqual({
                voice: {
                    sounds: [],
                    sourceRequest: undefined,
                },
                voiceInfo: {
                    individualEndTime: to.Ms(0),
                    individualRepetendDuration: to.Ms(0),
                    individualSegnoTime: HAS_NO_REPETEND,
                    sectionInfos: [],
                },
            })
    })
})
