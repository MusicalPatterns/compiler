import { Note, ThreadSpec } from '@musical-patterns/performer'
import { from, lowestCommonMultiple, Time, to } from '@musical-patterns/utilities'
import { compilePattern } from '../pattern'
import { CompilePatternParameters } from '../types'

const calculatePatternTotalCompiledDuration: (parameters: CompilePatternParameters) => Promise<Time> =
    async (parameters: CompilePatternParameters): Promise<Time> => {
        const threadSpecs: ThreadSpec[] = await compilePattern(parameters)

        const times: Time[] = threadSpecs.map((threadSpec: ThreadSpec): Time =>
            threadSpec.notes ? threadSpec.notes.reduce(
                (accumulator: Time, note: Note): Time =>
                    to.Time(from.Time(accumulator) + from.Time(note.duration)),
                to.Time(0),
            ) : to.Time(0))

        const rawRoundedTimes: number[] = times.map(from.Time)
            .map(Math.round)

        return to.Time(lowestCommonMultiple(...rawRoundedTimes))
    }

export {
    calculatePatternTotalCompiledDuration,
}
