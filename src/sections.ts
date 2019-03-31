import { Sound } from '@musical-patterns/performer'
import { ONCE, repeat } from '@musical-patterns/utilities'
import { compileSounds } from './sounds'
import { CompileSoundsOptions, Section } from './types'

const compileSections: (sections: Section[], options: CompileSoundsOptions) => Sound[] =
    (sections: Section[], options: CompileSoundsOptions): Sound[] =>
        sections.reduce(
            (accumulator: Sound[], { notes = [], repetitions }: Section) =>
                accumulator.concat(
                    repeat(
                        compileSounds(notes, options),
                        repetitions || ONCE,
                    ),
                ),
            [],
        )

export {
    compileSections,
}
