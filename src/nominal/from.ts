// tslint:disable:variable-name no-any

import { Core } from './types'

const Core: (core: Core) => number =
    (core: Core): number => core as any

export {
    Core,
}
