import { apply, isEmpty, Ms, Ordinal, to } from '@musical-patterns/utilities'
import { NOT_FOUND } from '../constants'
import { ComputeIndividualRepetendDurationParameters, SectionInfo } from './types'

const computeIndividualRepetendDuration:
    (parameters: { individualRepetendIndex: Ordinal, sectionInfos: SectionInfo[] }) => Ms =
    ({ individualRepetendIndex, sectionInfos }: ComputeIndividualRepetendDurationParameters): Ms =>
        individualRepetendIndex === NOT_FOUND ?
            to.Ms(0) :
            isEmpty(sectionInfos) ?
                to.Ms(0) :
                apply.Ordinal(sectionInfos, individualRepetendIndex).totalDuration

export {
    computeIndividualRepetendDuration,
}
