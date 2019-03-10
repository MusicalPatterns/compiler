import { Ms, sum, to } from '@musical-patterns/utilities'
import { compileSoundFeature } from '../features'
import { Note, NoteFeature, Scale } from '../types'

const calculateNotesTotalCompiledDuration: (notes: Note[], scales?: Scale[]) => Ms =
    (notes: Note[], scales?: Scale[]): Ms =>
        notes.reduce(
            (totalDuration: Ms, note: Note): Ms => {
                const noteDuration: NoteFeature = note.duration || {}
                const duration: Ms = compileSoundFeature(noteDuration, { scales })

                return sum(totalDuration, duration)
            },
            to.Ms(0),
        )

export {
    calculateNotesTotalCompiledDuration,
}
