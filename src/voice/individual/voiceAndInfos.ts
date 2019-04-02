import { SourceRequest, Voice } from '@musical-patterns/performer'
import { Maybe } from '@musical-patterns/utilities'
import { compileSourceRequest } from '../../source'
import { Entity, Scale } from '../../types'
import { CompileVoiceParameters } from '../types'
import { computeIndividualVoiceInfo } from './infos'
import { computeFirstPassIndividualSoundsAndSectionInfos } from './sections'
import { IndividualVoiceAndInfo, IndividualVoiceInfo, SoundsAndSectionInfos } from './types'

const computeIndividualVoiceAndInfo:
    (parameters: { entity: Entity, scales?: Scale[] }) => IndividualVoiceAndInfo =
    ({ entity, scales }: CompileVoiceParameters): IndividualVoiceAndInfo => {
        const { sections = [], timbreName } = entity

        const sourceRequest: Maybe<SourceRequest> = compileSourceRequest(timbreName)
        const soundsAndSectionInfos: SoundsAndSectionInfos =
            computeFirstPassIndividualSoundsAndSectionInfos(sections, { scales })
        const voice: Voice = { sounds: soundsAndSectionInfos.sounds, sourceRequest }
        const voiceInfo: IndividualVoiceInfo = computeIndividualVoiceInfo(soundsAndSectionInfos)

        return { voice, voiceInfo }
    }

export {
    computeIndividualVoiceAndInfo,
}
