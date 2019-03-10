import { OscillatorName, SampleName, SourceRequest, SourceType } from '@musical-patterns/performer'
import { Maybe } from '@musical-patterns/utilities'
import { compileSourceRequest, TimbreNameEnum } from '../../src/indexForTest'

describe('compile source request', () => {
    it('works for samples', () => {
        const sourceRequest: Maybe<SourceRequest> = compileSourceRequest(TimbreNameEnum.KICK)

        expect(sourceRequest)
            .toEqual({
                sourceType: SourceType.SAMPLE,
                timbreName: SampleName.KICK,
            })
    })

    it('works for oscillators', () => {
        const sourceRequest: Maybe<SourceRequest> = compileSourceRequest(TimbreNameEnum.SINE)

        expect(sourceRequest)
            .toEqual({
                sourceType: SourceType.OSCILLATOR,
                timbreName: OscillatorName.SINE,
            })
    })
})
