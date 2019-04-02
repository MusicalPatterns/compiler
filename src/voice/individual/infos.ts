import { Sound } from '@musical-patterns/performer'
import { Ms, Ordinal, sum, to } from '@musical-patterns/utilities'
import { computeIndividualRepetendDuration } from './repetendDuration'
import { computeIndividualSegnoTime } from './segnoTime'
import { ComputeIndividualVoiceInfoParameters, IndividualVoiceInfo, SectionInfo } from './types'

const computeIndividualVoiceInfo: (parameters: {
    doesAnySectionRepeatForever: boolean,
    sectionInfos: SectionInfo[],
    sounds: Sound[],
}) => IndividualVoiceInfo =
    (parameters: ComputeIndividualVoiceInfoParameters): IndividualVoiceInfo => {
        const { doesAnySectionRepeatForever, sounds, sectionInfos } = parameters

        const individualRepetendIndex: Ordinal = to.Ordinal(
            sectionInfos.findIndex((sectionInfo: SectionInfo) => sectionInfo.doesRepeatForever),
        )

        const individualSegnoTime: Ms =
            computeIndividualSegnoTime({
                doesAnySectionRepeatForever,
                individualRepetendIndex,
                sectionInfos,
                sounds,
            })
        const individualRepetendDuration: Ms = computeIndividualRepetendDuration({
            individualRepetendIndex,
            sectionInfos,
        })
        const individualEndTime: Ms = sum(...sectionInfos.map((sectionInfo: SectionInfo) => sectionInfo.totalDuration))

        return {
            individualEndTime,
            individualRepetendDuration,
            individualSegnoTime,
            sectionInfos,
        }
    }

export {
    computeIndividualVoiceInfo,
}
