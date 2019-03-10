import { Voice } from '@musical-patterns/performer'
import { CompileVoicesParameters, Entity } from './types'
import { compileVoice } from './voice'

const compileVoices: (compileVoicesParameters: CompileVoicesParameters) => Voice[] =
    ({ entities, scales }: CompileVoicesParameters): Voice[] =>
        entities.map((entity: Entity): Voice =>
            compileVoice({ entity, scales }))

export {
    compileVoices,
}
