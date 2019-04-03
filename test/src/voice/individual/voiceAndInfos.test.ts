import { NON_SEGNO_TIME } from '@musical-patterns/performer'
import { to } from '@musical-patterns/utilities'
import { computeIndividualVoiceAndInfo, IndividualVoiceAndInfo } from '../../../../src/indexForTest'

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
                    individualSegnoTime: NON_SEGNO_TIME,
                    sectionInfos: [],
                },
            })
    })
})
