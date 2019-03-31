import { SoundsSection } from '@musical-patterns/performer'
import { isUndefined } from '@musical-patterns/utilities'
import { compileSounds } from './sounds'
import { CompileSoundsOptions, Section } from './types'

const compileSections: (sections: Section[], options: CompileSoundsOptions) => SoundsSection[] =
    (sections: Section[], options: CompileSoundsOptions): SoundsSection[] =>
        sections.map(({ notes = [], repetitions }: Section) => {
            const soundsSection: SoundsSection = {
                sounds: compileSounds(notes, options),
            }

            if (!isUndefined(repetitions)) {
                soundsSection.repetitions = repetitions
            }

            return soundsSection
        })

export {
    compileSections,
}
