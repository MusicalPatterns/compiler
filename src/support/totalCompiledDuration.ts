import { Sound, Voice } from '@musical-patterns/performer'
import { computeLeastCommonMultiple, from, Integer, Ms, round, sum, to } from '@musical-patterns/utilities'
import { compileSoundFeature } from '../features'
import { compilePattern } from '../patterns'
import { CompilePatternParameters, Material, Note, NoteFeature, Scale } from '../types'

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

const computePatternTotalCompiledDuration: (parameters: {
    material: Material,
    // tslint:disable-next-line no-any
    spec?: { initialSpecs: any },
    // tslint:disable-next-line no-any
    specs?: any,
}) => Promise<Ms> =
    async (parameters: CompilePatternParameters): Promise<Ms> => {
        const voices: Voice[] = await compilePattern(parameters)

        return computeVoicesDuration(voices)
    }

const computeVoicesDuration: (voices: Voice[]) => Ms =
    (voices: Voice[]): Ms => {
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

        return to.Ms(computeLeastCommonMultiple(...rawRoundedDurations))
    }

export {
    computeNotesTotalCompiledDuration,
    computePatternTotalCompiledDuration,
    computeVoicesDuration,
}
