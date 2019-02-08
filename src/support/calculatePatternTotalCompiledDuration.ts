import { Note, ThreadSpec } from '@musical-patterns/performer'
import { from, lowestCommonMultiple, Ms, round, sum, to } from '@musical-patterns/utilities'
import { compilePattern } from '../pattern'
import { CompilePatternParameters } from '../types'

const calculatePatternTotalCompiledDuration: (parameters: CompilePatternParameters) => Promise<Ms> =
    async (parameters: CompilePatternParameters): Promise<Ms> => {
        const threadSpecs: ThreadSpec[] = await compilePattern(parameters)

        const durations: Ms[] = threadSpecs.map((threadSpec: ThreadSpec): Ms =>
            threadSpec.notes ? threadSpec.notes.reduce(
                (accumulator: Ms, note: Note): Ms =>
                    sum(accumulator, note.duration),
                to.Ms(0),
            ) : to.Ms(0))

        const rawRoundedDurations: number[] = durations.map(from.Ms)
            .map(round)

        return to.Ms(lowestCommonMultiple(...rawRoundedDurations))
    }

export {
    calculatePatternTotalCompiledDuration,
}
