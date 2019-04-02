import { OscillatorName, SampleName } from '@musical-patterns/performer'

type TimbreName = SampleName | OscillatorName

// tslint:disable-next-line variable-name typedef
const TimbreNameEnum = {
    ...OscillatorName,
    ...SampleName,
}

export {
    TimbreName,
    TimbreNameEnum,
}
