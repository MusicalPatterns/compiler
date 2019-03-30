import { SoundsSection } from '@musical-patterns/performer'
import { isUndefined } from '@musical-patterns/utilities'
import { compileSounds } from './sounds'
import { CompileSoundsOptions, NotesSection } from './types'

const compileSections: (notesSections: NotesSection[], options: CompileSoundsOptions) => SoundsSection[] =
    (notesSections: NotesSection[], options: CompileSoundsOptions): SoundsSection[] =>
        notesSections.map(({ notes = [], repetitions, delayFor, wrapAt }: NotesSection) => {
            const soundsSection: SoundsSection = {
                sounds: compileSounds(notes, options),
            }

            if (!isUndefined(repetitions)) {
                soundsSection.repetitions = repetitions
            }
            if (!isUndefined(delayFor)) {
                soundsSection.delayFor = delayFor
            }
            if (!isUndefined(wrapAt)) {
                soundsSection.wrapAt = wrapAt
            }

            return soundsSection
        })

export {
    compileSections,
}
