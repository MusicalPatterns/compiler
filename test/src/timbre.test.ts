import { OscillatorName, SampleName, VoiceSpec, VoiceType } from '@musical-patterns/performer'
import { Maybe } from '@musical-patterns/utilities'
import { compileTimbre, TimbreNameEnum } from '../../src/indexForTest'

describe('compile timbre', () => {
    it('works for samples', () => {
        const voiceSpec: Maybe<VoiceSpec> = compileTimbre(TimbreNameEnum.KICK)

        expect(voiceSpec)
            .toEqual({
                timbreName: SampleName.KICK,
                voiceType: VoiceType.SAMPLE,
            })
    })

    it('works for oscillators', () => {
        const voiceSpec: Maybe<VoiceSpec> = compileTimbre(TimbreNameEnum.SINE)

        expect(voiceSpec)
            .toEqual({
                timbreName: OscillatorName.SINE,
                voiceType: VoiceType.OSCILLATOR,
            })
    })
})
