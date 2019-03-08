// tslint:disable no-reaching-imports

export { compileNote } from './notes'
export { compileNoteAspect } from './noteAspect'
export { compilePattern } from './pattern'
export { compileTimbre } from './timbre'
export { compileThreadSpec } from './thread'
export {
    calculateNoteSpecsTotalCompiledDuration,
    calculatePatternTotalCompiledDuration,
} from './support/indexForTest'
export { NoteAspect, to } from './nominal'

export {
    CompileNotesOptions,
    NoteAspectSpec,
    Scale,
    NoteSpec,
    Material,
    BuildEntitiesFunction,
    BuildScalesFunction,
    Entity,
    TimbreNameEnum,
} from './types'
