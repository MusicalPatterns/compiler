// tslint:disable:no-reaching-imports

export { compileNote } from './notes'
export { compileNoteProperty } from './noteProperty'
export { compilePattern } from './pattern'
export { compileTimbre } from './timbre'
export { compileThreadSpec } from './thread'
export { calculateNoteSpecsTotalCompiledDuration } from './support/indexForTest'
export { migrate, CompilerVersion, ThreadSpecOneZeroSeven, ThreadSpecOneZeroThirty } from './migration/indexForTest'

export {
    CompileNotesOptions,
    NotePropertySpec,
    NoteProperty,
    Scale,
    NoteSpec,
    PatternMaterial,
    BuildEntitiesFunction,
    BuildScalesFunction,
    Entity,
    TimbreNameEnum,
} from './types'
