import { Note, ThreadSpec } from '@musical-patterns/performer'
import { from, Integer, lowestCommonMultiple, Ms, round, sum, to } from '@musical-patterns/utilities'
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

        const rawRoundedDurations: Integer[] = durations.map(from.Ms)
        // tslint:disable-next-line no-unnecessary-callback-wrapper
            .map((duration: number) => round(duration))
            .filter((duration: number) => duration !== 0)
            .map(to.Integer)

        return to.Ms(lowestCommonMultiple(...rawRoundedDurations))
    }

export {
    calculatePatternTotalCompiledDuration,
}
