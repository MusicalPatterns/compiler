import { Sound, Voice } from '@musical-patterns/performer'
import { Ms, Ordinal } from '@musical-patterns/utilities'

interface ComputeIndividualRepetendDurationParameters {
    individualRepetendIndex: Ordinal,
    sectionInfos: SectionInfo[],
}

interface ComputeIndividualSegnoTimeParameters {
    individualRepetendIndex: Ordinal,
    sectionInfos: SectionInfo[],
}

interface IndividualVoiceInfo {
    individualEndTime: Ms,
    individualRepetendDuration: Ms,
    individualSegnoTime: Ms,
    sectionInfos: SectionInfo[],
}

interface IndividualVoiceAndInfo {
    voice: Voice,
    voiceInfo: IndividualVoiceInfo,
}

interface SoundsAndSectionInfos {
    sectionInfos: SectionInfo[],
    sounds: Sound[],
}

interface SectionInfo {
    doesRepeatForever: boolean,
    totalDuration: Ms,
}

export {
    ComputeIndividualRepetendDurationParameters,
    ComputeIndividualSegnoTimeParameters,
    IndividualVoiceAndInfo,
    IndividualVoiceInfo,
    SectionInfo,
    SoundsAndSectionInfos,
}
