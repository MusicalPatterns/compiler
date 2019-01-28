import { ThreadSpec } from '@musical-patterns/performer'
import { compileThreadSpec, Entity } from '../../src/indexForTest'

describe('compile thread', () => {
    it('defaults', () => {
        const nonEntity: Entity = {}
        const threadSpec: ThreadSpec = compileThreadSpec({
            entity: nonEntity,
        })

        expect(threadSpec)
            .toEqual({
                notes: [],
                voiceSpec: undefined,
            })
    })
})
