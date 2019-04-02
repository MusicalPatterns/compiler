import { Sound } from '@musical-patterns/performer'
import { isUndefined, Ms, ONCE, repeat } from '@musical-patterns/utilities'
import { compileSounds, CompileSoundsOptions } from '../../sound'
import { computeSoundsDuration } from '../../support'
import { Section } from '../types'
import { SectionInfo, SoundsAndSectionInfos } from './types'

const computeFirstPassIndividualSoundsAndSectionInfos:
    (sections: Section[], options: CompileSoundsOptions) => SoundsAndSectionInfos =
    (sections: Section[], options: CompileSoundsOptions): SoundsAndSectionInfos => {
        const sectionInfos: SectionInfo[] = []

        let doesAnySectionRepeatForever: boolean = false

        const sounds: Sound[] = sections.reduce(
            (accumulator: Sound[], { notes = [], repetitions }: Section) => {
                const sectionSounds: Sound[] = repeat(
                    compileSounds(notes, options),
                    repetitions || ONCE,
                )

                const doesThisSectionRepeatForever: boolean = isUndefined(repetitions)
                if (doesThisSectionRepeatForever) {
                    doesAnySectionRepeatForever = true
                }

                const totalDuration: Ms = computeSoundsDuration(sectionSounds)

                const sectionInfo: SectionInfo = {
                    doesRepeatForever: doesThisSectionRepeatForever,
                    totalDuration,
                }
                sectionInfos.push(sectionInfo)

                return accumulator.concat(sectionSounds)
            },
            [],
        )

        return { sounds, sectionInfos, doesAnySectionRepeatForever }
    }

export {
    computeFirstPassIndividualSoundsAndSectionInfos,
}
