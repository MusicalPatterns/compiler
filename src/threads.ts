import { Entity, ThreadSpec } from '@musical-patterns/utilities'
import { compileThreadSpec } from './thread'
import { CompileThreadsParameters } from './types'

const compileThreadSpecs: (compileThreadsParameters: CompileThreadsParameters) => ThreadSpec[] =
    ({ entities, scales }: CompileThreadsParameters): ThreadSpec[] =>
        entities.map((entity: Entity): ThreadSpec =>
            compileThreadSpec({ entity, scales }))

export {
    compileThreadSpecs,
}
