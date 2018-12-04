import { SampleName, VoiceSpec, VoiceType } from '@musical-patterns/performer'
import { TimbreName } from './types'

// @ts-ignore
const compileTimbre: (timbre: TimbreName) => VoiceSpec =
    // @ts-ignore
    (timbre: TimbreName): VoiceSpec => {
        // tslint:disable-next-line:no-unsafe-any
        if (timbre in SampleName) {
            return {
                // tslint:disable-next-line:no-unsafe-any
                timbre,
                voiceType: VoiceType.SAMPLE,
            }
        }
        else {
            return {
                // tslint:disable-next-line:no-unsafe-any
                timbre,
                voiceType: VoiceType.OSCILLATOR,
            }
        }
    }

export {
    compileTimbre,
}
