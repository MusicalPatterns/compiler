import { OscillatorName, SampleName, TimbreName, VoiceSpec, VoiceType } from '@musical-patterns/performer'
import { isUndefined, Maybe } from '@musical-patterns/utilities'

const isSampleName: (timbreName: TimbreName) => timbreName is SampleName =
    (timbreName: TimbreName): timbreName is SampleName =>
        timbreName in SampleName

const isOscillatorName: (timbreName: TimbreName) => timbreName is OscillatorName =
    (timbreName: TimbreName): timbreName is OscillatorName =>
        timbreName in OscillatorName

const compileTimbre: (timbreName?: TimbreName) => Maybe<VoiceSpec> =
    (timbreName?: TimbreName): Maybe<VoiceSpec> => {
        if (isUndefined(timbreName)) {
            return undefined
        }
        else if (isSampleName(timbreName)) {
            return {
                timbreName,
                voiceType: VoiceType.SAMPLE,
            }
        }
        else if (isOscillatorName(timbreName)) {
            return {
                timbreName,
                voiceType: VoiceType.OSCILLATOR,
            }
        }
        else {
            return undefined
        }
    }

export {
    compileTimbre,
}
