import { OscillatorName, Part, SpatializationType, ThreadSpec, VoiceType } from '@musical-patterns/shared'
import { compilePart } from './part'
import { CompileThreadParameters } from './types'

const compileThreadSpec: (compileEntityParameters: CompileThreadParameters) => ThreadSpec =
    ({ entity, scales }: CompileThreadParameters): ThreadSpec => {
        const {
            partSpec = [],
            voiceSpec = {
                spatialization: SpatializationType.MONO,
                timbre: OscillatorName.SQUARE,
                voiceType: VoiceType.OSCILLATOR,
            },
        } = entity

        const part: Part = compilePart(partSpec, { scales })

        return {
            part,
            voiceSpec,
        }
    }

export {
    compileThreadSpec,
}
