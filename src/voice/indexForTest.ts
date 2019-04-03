// tslint:disable no-reaching-imports

export { compileVoices } from './voices'

export {
    computeIndividualVoiceAndInfo,
    IndividualVoiceAndInfo,
    SectionInfo,
    computeIndividualVoiceInfo,
    IndividualVoiceInfo,
    computeIndividualRepetendDuration,
    computeIndividualSegnoTime,
    computeIndividualSoundsAndSectionInfos,
    SoundsAndSectionInfos,
} from './individual/indexForTest'
export {
    applyCollectiveInfos,
    computeRepetendSounds,
    computeSegnoIndex,
    computeFillGapSounds,
    fillGap,
    computeCollectiveInfos,
    CollectiveVoiceInfos,
} from './collective/indexForTest'

export {
    HAS_NO_REPETEND,
} from './constants'
export {
    Section,
} from './types'
