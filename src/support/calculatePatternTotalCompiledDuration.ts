import { Note, ThreadSpec } from '@musical-patterns/performer'
import { from, lowestCommonMultiple, Time, to } from '@musical-patterns/utilities'
import { compilePattern } from '../pattern'
import { CompilePatternParameters } from '../types'

const calculatePatternTotalCompiledDuration: (parameters: CompilePatternParameters) => Promise<Time> =
    async (parameters: CompilePatternParameters): Promise<Time> => {
        const threadSpecs: ThreadSpec[] = await compilePattern(parameters)

        const times: Time[] = threadSpecs.map((threadSpec: ThreadSpec): Time =>
            // tslint:disable-next-line:no-unsafe-any
            threadSpec.notes.reduce(
                (accumulator: Time, note: Note): Time =>
                    // tslint:disable-next-line:no-unsafe-any
                    to.Time(from.Time(accumulator) + from.Time(note.duration)),
                to.Time(0),
            ))

        return to.Time(lowestCommonMultiple(...times.map(from.Time)))
    }

export {
    calculatePatternTotalCompiledDuration,
}
