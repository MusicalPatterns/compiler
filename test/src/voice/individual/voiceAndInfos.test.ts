import { NON_SEGNO_TIME } from '@musical-patterns/performer'
import { BEGINNING, NO_DURATION } from '@musical-patterns/utilities'
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
                    individualEndTime: BEGINNING,
                    individualRepetendDuration: NO_DURATION,
                    individualSegnoTime: NON_SEGNO_TIME,
                    sectionInfos: [],
                },
            })
    })
})
