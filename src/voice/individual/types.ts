import { Sound, Voice } from '@musical-patterns/performer'
import { Ms, Ordinal } from '@musical-patterns/utilities'

interface ComputeIndividualVoiceInfoParameters {
    doesAnySectionRepeatForever: boolean,
    sectionInfos: SectionInfo[],
    sounds: Sound[],
}

interface ComputeIndividualRepetendDurationParameters {
    individualRepetendIndex: Ordinal,
    sectionInfos: SectionInfo[],
}

interface ComputeIndividualSegnoTimeParameters {
    doesAnySectionRepeatForever: boolean,
    individualRepetendIndex: Ordinal,
    sectionInfos: SectionInfo[],
    sounds: Sound[],
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
    doesAnySectionRepeatForever: boolean,
    sectionInfos: SectionInfo[],
    sounds: Sound[],
}

interface SectionInfo {
    doesRepeatForever: boolean,
    totalDuration: Ms,
}

export {
    ComputeIndividualVoiceInfoParameters,
    ComputeIndividualRepetendDurationParameters,
    ComputeIndividualSegnoTimeParameters,
    IndividualVoiceAndInfo,
    IndividualVoiceInfo,
    SectionInfo,
    SoundsAndSectionInfos,
}
