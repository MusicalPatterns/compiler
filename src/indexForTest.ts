// tslint:disable no-reaching-imports

export { compileSound } from './sounds'
export { compileSoundFeature } from './features'
export { compilePattern } from './patterns'
export { compileSourceRequest } from './sources'
export { compileVoice } from './voices'
export {
    computeNotesTotalCompiledDuration,
    computePatternTotalCompiledDuration,
    computeVoicesDuration,
} from './support/indexForTest'
export { SoundFeature, to } from './nominals'

export {
    CompileSoundsOptions,
    NoteFeature,
    Scale,
    Note,
    Material,
    MaterializeEntities,
    MaterializeScales,
    Entity,
    TimbreNameEnum,
} from './types'
