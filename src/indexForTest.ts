// tslint:disable no-reaching-imports

export { compileNote } from './notes'
export { compileNoteProperty } from './noteProperty'
export { compilePattern } from './pattern'
export { compileTimbre } from './timbre'
export { compileThreadSpec } from './thread'
export {
    calculateNoteSpecsTotalCompiledDuration,
    calculatePatternTotalCompiledDuration,
} from './support/indexForTest'
export { NoteProperty, to } from './nominal/indexForTest'

export {
    CompileNotesOptions,
    NotePropertySpec,
    Scale,
    NoteSpec,
    Material,
    BuildEntitiesFunction,
    BuildScalesFunction,
    Entity,
    TimbreNameEnum,
} from './types'
