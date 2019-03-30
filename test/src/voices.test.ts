import { Voice } from '@musical-patterns/performer'
import { compileVoice, Entity } from '../../src/indexForTest'

describe('compile voice', () => {
    it('defaults', () => {
        const nonEntity: Entity = {}
        const voice: Voice = compileVoice({
            entity: nonEntity,
        })

        expect(voice)
            .toEqual({
                sections: [],
                sourceRequest: undefined,
            })
    })
})
