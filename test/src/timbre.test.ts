import { OscillatorName, SampleName, VoiceSpec, VoiceType } from '@musical-patterns/performer'
import { compileTimbre, TimbreName } from '../../src/indexForTest'

describe('compile timbre', () => {
    it('works for samples', () => {
        const voiceSpec: VoiceSpec = compileTimbre(TimbreName.KICK)

        expect(voiceSpec)
            .toEqual({
                timbre: SampleName.KICK,
                voiceType: VoiceType.SAMPLE,
            })
    })

    it('works for oscillators', () => {
        const voiceSpec: VoiceSpec = compileTimbre(TimbreName.SINE)

        expect(voiceSpec)
            .toEqual({
                timbre: OscillatorName.SINE,
                voiceType: VoiceType.OSCILLATOR,
            })
    })
})
