import { OscillatorName, SampleName, VoiceSpec, VoiceType } from '@musical-patterns/performer'
import { Maybe } from '@musical-patterns/utilities'

const compileTimbre: (timbreName?: string) => Maybe<VoiceSpec> =
    (timbreName: string = ''): Maybe<VoiceSpec> => {
        if (timbreName in SampleName) {
            return {
                timbreName: timbreName as SampleName,
                voiceType: VoiceType.SAMPLE,
            }
        }
        else if (timbreName in OscillatorName) {
            return {
                timbreName: timbreName as OscillatorName,
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
