import { OscillatorName, SampleName, VoiceSpec, VoiceType } from '@musical-patterns/performer'
import { Maybe } from '@musical-patterns/utilities'

const compileTimbre: (timbre?: string) => Maybe<VoiceSpec> =
    (timbre: string = ''): Maybe<VoiceSpec> => {
        if (timbre in SampleName) {
            return {
                timbre: timbre as SampleName,
                voiceType: VoiceType.SAMPLE,
            }
        }
        else if (timbre in OscillatorName) {
            return {
                timbre: timbre as OscillatorName,
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
