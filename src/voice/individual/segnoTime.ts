import { NON_SEGNO_TIME } from '@musical-patterns/performer'
import { apply, INITIAL, Ms, Ordinal, slice, to } from '@musical-patterns/utilities'
import { NOT_FOUND } from '../constants'
import { ComputeIndividualSegnoTimeParameters, SectionInfo } from './types'

const computeIndividualSegnoTimeWhenVoiceHasRepetend:
    (sectionInfos: SectionInfo[], individualRepetendIndex: Ordinal) => Ms =
    (sectionInfos: SectionInfo[], individualRepetendIndex: Ordinal): Ms =>
        slice(sectionInfos, INITIAL, individualRepetendIndex)
            .reduce(
                (accumulator: Ms, sectionInfo: SectionInfo) =>
                    apply.Translation(accumulator, to.Translation(sectionInfo.totalDuration)),
                to.Ms(0),
            )

const computeIndividualSegnoTime:
    (parameters: { individualRepetendIndex: Ordinal, sectionInfos: SectionInfo[] }) => Ms =
    ({ individualRepetendIndex, sectionInfos }: ComputeIndividualSegnoTimeParameters): Ms =>
        individualRepetendIndex === NOT_FOUND ?
            NON_SEGNO_TIME :
            computeIndividualSegnoTimeWhenVoiceHasRepetend(sectionInfos, individualRepetendIndex)

export {
    computeIndividualSegnoTime,
}
