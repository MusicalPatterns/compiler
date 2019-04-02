import { Sound } from '@musical-patterns/performer'
import { Ms, sum, to } from '@musical-patterns/utilities'
import { compileSoundFeature, Note, NoteFeature } from '../sound'
import { Scale } from '../types'

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

const computeSoundsDuration: (sounds: Sound[]) => Ms =
    (sounds: Sound[]): Ms =>
        sounds.reduce(
            (accumulator: Ms, sound: Sound): Ms =>
                sum(accumulator, sound.duration),
            to.Ms(0),
        )

export {
    computeNotesTotalCompiledDuration,
    computeSoundsDuration,
}
