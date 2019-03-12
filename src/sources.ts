import { OscillatorName, SampleName, SourceRequest, SourceType, TimbreName } from '@musical-patterns/performer'
import { isUndefined, Maybe } from '@musical-patterns/utilities'

const isSampleName: (timbreName: TimbreName) => timbreName is SampleName =
    (timbreName: TimbreName): timbreName is SampleName =>
        timbreName in SampleName

const isOscillatorName: (timbreName: TimbreName) => timbreName is OscillatorName =
    (timbreName: TimbreName): timbreName is OscillatorName =>
        timbreName in OscillatorName

const compileSourceRequest: (timbreName?: TimbreName) => Maybe<SourceRequest> =
    (timbreName?: TimbreName): Maybe<SourceRequest> => {
        if (isUndefined(timbreName)) {
            return undefined
        }
        else if (isSampleName(timbreName)) {
            return {
                sourceType: SourceType.SAMPLE,
                timbreName,
            }
        }
        else if (isOscillatorName(timbreName)) {
            return {
                sourceType: SourceType.OSCILLATOR,
                timbreName,
            }
        }
        else {
            return undefined
        }
    }

export {
    compileSourceRequest,
}
