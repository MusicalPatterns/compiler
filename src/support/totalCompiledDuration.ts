import { Sound, Voice } from '@musical-patterns/performer'
import { from, Integer, lowestCommonMultiple, Ms, round, sum, to } from '@musical-patterns/utilities'
import { compileSoundFeature } from '../features'
import { compilePattern } from '../patterns'
import { CompilePatternParameters, Note, NoteFeature, Scale } from '../types'

const computeNotesTotalCompiledDuration: (notes: Note[], scales?: Scale[]) => Ms =
    (notes: Note[], scales?: Scale[]): Ms =>
        notes.reduce(
            (totalDuration: Ms, note: Note): Ms => {
                const noteDuration: NoteFeature = note.duration || {}
                const duration: Ms = compileSoundFeature(noteDuration, { scales })

                return sum(totalDuration, duration)
            },
            to.Ms(0),
        )

const computePatternTotalCompiledDuration: (parameters: CompilePatternParameters) => Promise<Ms> =
    async (parameters: CompilePatternParameters): Promise<Ms> => {
        const voices: Voice[] = await compilePattern(parameters)

        const durations: Ms[] = voices.map((voice: Voice): Ms =>
            voice.sounds ? voice.sounds.reduce(
                (accumulator: Ms, sound: Sound): Ms =>
                    sum(accumulator, sound.duration),
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
    computeNotesTotalCompiledDuration,
    computePatternTotalCompiledDuration,
}
