import { Voice } from '@musical-patterns/performer'
import { apply, Maybe, Ms, Ordinal } from '@musical-patterns/utilities'
import { Entity, Scale } from '../../types'
import { SectionInfo } from '../individual'
import { fillGap } from './fillGap'
import { computeSegnoIndex } from './segnoIndex'
import { ApplyCollectiveInfosParameters } from './types'

const applyCollectiveInfos: (parameters: {
    collectiveEndTime: Ms,
    collectiveSegnoTime: Ms,
    collectiveShareSegnoTime: boolean,
    entities: Entity[],
    index: Ordinal,
    individualSegnoTime: Ms,
    scales: Maybe<Scale[]>,
    sectionInfos: SectionInfo[],
    voice: Voice,
}) => Voice =
    ({
         collectiveEndTime,
         collectiveSegnoTime,
         collectiveShareSegnoTime,
         entities,
         index,
         voice,
         sectionInfos,
         individualSegnoTime,
         scales,
     }: ApplyCollectiveInfosParameters): Voice => {
        if (!collectiveShareSegnoTime) {
            voice.sounds = fillGap({
                collectiveEndTime,
                scales: scales || [],
                sectionInfos,
                sections: apply.Ordinal(entities, index).sections || [],
                sounds: voice.sounds || [],
            })
        }

        const segnoIndex: Ordinal = computeSegnoIndex({ collectiveSegnoTime, individualSegnoTime, voice })

        return { ...voice, segnoIndex }
    }

export {
    applyCollectiveInfos,
}
