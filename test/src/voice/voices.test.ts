import { to } from '@musical-patterns/utilities'
import {
    computeIndividualVoiceAndInfo,
    Entity,
    HAS_NO_REPETEND,
    IndividualVoiceAndInfo,
} from '../../../src/indexForTest'

describe('compute voice and info (which used to be compile voice, when this test made more sense)', () => {
    it('defaults', () => {
        const nonEntity: Entity = {}
        const voiceAndInfo: IndividualVoiceAndInfo = computeIndividualVoiceAndInfo({
            entity: nonEntity,
        })

        expect(voiceAndInfo)
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
