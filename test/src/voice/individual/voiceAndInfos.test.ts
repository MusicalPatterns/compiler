import { NON_SEGNO_TIME, OscillatorName, SourceType } from '@musical-patterns/performer'
import { BEGINNING, NO_DURATION } from '@musical-patterns/utilities'
import {
    computeIndividualVoiceAndInfo,
    IndividualVoiceAndInfo,
    TEMPORARY_UNDEFINED_SEGNO_INDEX,
} from '../../../../src/indexForTest'

describe('compute individual voice and info', () => {
    it('defaults', () => {
        const actualVoiceAndInfo: IndividualVoiceAndInfo = computeIndividualVoiceAndInfo({ entity: {} })

        expect(actualVoiceAndInfo)
            .toEqual({
                voice: {
                    delay: NO_DURATION,
                    segnoIndex: TEMPORARY_UNDEFINED_SEGNO_INDEX,
                    sounds: [],
                    sourceRequest: {
                        sourceType: SourceType.OSCILLATOR,
                        timbreName: OscillatorName.SINE,
                    },
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
