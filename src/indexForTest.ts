// tslint:disable no-reaching-imports

export { compileSound } from './sounds'
export { compileSoundFeature } from './features'
export { compilePattern } from './pattern'
export { compileSourceRequest } from './source'
export { compileVoice } from './voice'
export {
    calculateNotesTotalCompiledDuration,
    calculatePatternTotalCompiledDuration,
} from './support/indexForTest'
export { SoundFeature, to } from './nominal'

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
