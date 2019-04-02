import { Sound } from '@musical-patterns/performer'
import { apply, INITIAL, isEmpty, Ms, NEXT, Ordinal, to } from '@musical-patterns/utilities'
import { computeSoundsDuration } from '../../support'
import { HAS_NO_REPETEND, NOT_FOUND } from '../constants'
import {
    ComputeIndividualSegnoTimeParameters,
    SectionInfo,
} from './types'

const computeSegnoTimeWhenItIsSimplyTheEndTime: (sounds: Sound[]) => Ms =
    // tslint:disable no-unnecessary-callback-wrapper
    (sounds: Sound[]): Ms =>
        computeSoundsDuration(sounds)

const computeSegnoTimeWhenItIsSomewhereInTheMiddle:
    (sectionInfos: SectionInfo[], individualRepetendIndex: Ordinal) => Ms =
    (sectionInfos: SectionInfo[], individualRepetendIndex: Ordinal): Ms => {
        if (isEmpty(sectionInfos)) {
            throw new Error('you cannot find the segno time without section infos')
        }

        let individualSegnoTime: Ms = to.Ms(0)
        for (
            let index: Ordinal = INITIAL;
            index < individualRepetendIndex;
            index = apply.Translation(index, NEXT)
        ) {
            const sectionInfo: SectionInfo = apply.Ordinal(sectionInfos, index)
            individualSegnoTime = apply.Translation(
                individualSegnoTime,
                to.Translation(sectionInfo.totalDuration),
            )
        }

        return individualSegnoTime
    }

const computeIndividualSegnoTime: (parameters: {
    doesAnySectionRepeatForever: boolean,
    individualRepetendIndex: Ordinal,
    sectionInfos: SectionInfo[],
    sounds: Sound[],
}) => Ms =
    ({
         doesAnySectionRepeatForever,
         individualRepetendIndex,
         sounds,
         sectionInfos,
     }: ComputeIndividualSegnoTimeParameters): Ms =>
        doesAnySectionRepeatForever ?
            individualRepetendIndex === NOT_FOUND ?
                computeSegnoTimeWhenItIsSimplyTheEndTime(sounds) :
                computeSegnoTimeWhenItIsSomewhereInTheMiddle(
                    sectionInfos,
                    individualRepetendIndex,
                ) :
            HAS_NO_REPETEND

export {
    computeIndividualSegnoTime,
}
