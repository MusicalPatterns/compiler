// tslint:disable no-reaching-imports

export { compilePattern } from './patterns'
export { SoundFeature, to } from './nominals'

export {
    compileSound,
    compileSoundFeature,
    NoteFeature,
    Note,
    CompileSoundsOptions,
} from './sound/indexForTest'
export {
    compileSourceRequest,
    TimbreNameEnum,
} from './source/indexForTest'
export {
    computeNotesTotalCompiledDuration,
} from './support/indexForTest'
export {
    computeIndividualVoiceAndInfo,
    IndividualVoiceAndInfo,
    HAS_NO_REPETEND,
    Section,
    SectionInfo,
    computeRepetendSounds,
    computeFillGapSounds,
    fillGap,
    computeSegnoIndex,
    applyCollectiveInfos,
    CollectiveVoiceInfos,
    computeCollectiveInfos,
} from './voice/indexForTest'

export {
    Scale,
    Material,
    MaterializeEntities,
    MaterializeScales,
    Entity,
    CompiledPattern,
} from './types'
