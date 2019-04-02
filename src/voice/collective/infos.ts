import { allValuesAreTheSame, computeLeastCommonMultiple, from, max, Ms, sum, to } from '@musical-patterns/utilities'
import { HAS_NO_REPETEND } from '../constants'
import { IndividualVoiceAndInfo, IndividualVoiceInfo } from '../individual'
import { CollectiveVoiceInfos, PluckedVoiceInfos } from './types'

const pluckInfos: (individualVoicesAndInfos: IndividualVoiceAndInfo[]) => PluckedVoiceInfos =
    (individualVoicesAndInfos: IndividualVoiceAndInfo[]): PluckedVoiceInfos => {
        const individualVoiceInfos: IndividualVoiceInfo[] = individualVoicesAndInfos.map(
            (voiceAndInfo: IndividualVoiceAndInfo) => voiceAndInfo.voiceInfo,
        )

        const individualSegnoTimes: Ms[] = individualVoiceInfos.map((voiceInfo: IndividualVoiceInfo) =>
            voiceInfo.individualSegnoTime,
        )
        const individualRepetendDurations: Ms[] = individualVoiceInfos.map((individualVoiceInfo: IndividualVoiceInfo) =>
            individualVoiceInfo.individualRepetendDuration,
        )
        const individualEndTimes: Ms[] = individualVoiceInfos.map((individualVoiceInfo: IndividualVoiceInfo) =>
            individualVoiceInfo.individualEndTime,
        )

        return {
            individualEndTimes,
            individualRepetendDurations,
            individualSegnoTimes,
        }
    }

const computeCollectiveInfosFromPluckedInfos: (parameters: {
    individualEndTimes: Ms[],
    individualRepetendDurations: Ms[],
    individualSegnoTimes: Ms[],
}) => CollectiveVoiceInfos =
    (
        { individualEndTimes, individualRepetendDurations, individualSegnoTimes }: PluckedVoiceInfos,
    ): CollectiveVoiceInfos => {
        const collectiveShareSegnoTime: boolean = allValuesAreTheSame(individualSegnoTimes)
        const collectiveSegnoTime: Ms = max(...individualSegnoTimes)
        const collectiveRepetendDuration: Ms = to.Ms(computeLeastCommonMultiple(
            ...individualRepetendDurations
                .filter((individualRepetendDuration: Ms) => individualRepetendDuration !== to.Ms(0))
                .map(from.Ms)
                .map(to.Integer),
        ))
        const collectiveEndTime: Ms = collectiveSegnoTime === HAS_NO_REPETEND ?
            max(...individualEndTimes) :
            sum(collectiveSegnoTime, collectiveRepetendDuration)

        return {
            collectiveEndTime,
            collectiveRepetendDuration,
            collectiveSegnoTime,
            collectiveShareSegnoTime,
        }
    }

const computeCollectiveInfos: (individualVoicesAndInfos: IndividualVoiceAndInfo[]) => CollectiveVoiceInfos =
    (individualVoicesAndInfos: IndividualVoiceAndInfo[]): CollectiveVoiceInfos =>
        computeCollectiveInfosFromPluckedInfos(pluckInfos(individualVoicesAndInfos))

export {
    computeCollectiveInfos,
}
