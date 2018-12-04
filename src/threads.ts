import { ThreadSpec } from '@musical-patterns/performer'
import { compileThreadSpec } from './thread'
import { CompileThreadsParameters, Entity } from './types'

const compileThreadSpecs: (compileThreadsParameters: CompileThreadsParameters) => ThreadSpec[] =
    ({ entities, scales }: CompileThreadsParameters): ThreadSpec[] =>
        entities.map((entity: Entity): ThreadSpec =>
            // tslint:disable-next-line:no-unsafe-any
            compileThreadSpec({ entity, scales }))

export {
    compileThreadSpecs,
}
