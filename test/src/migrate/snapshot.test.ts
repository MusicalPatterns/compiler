import { ThreadSpec } from '@musical-patterns/performer'
import { to } from '@musical-patterns/utilities'
import {
    BuildEntitiesFunction,
    BuildScalesFunction,
    compilePattern,
    Entity,
    Material,
    Scale,
    TimbreNameEnum,
} from '../../../src/indexForTest'

describe('if this test fails, you need to include a new migration', () => {
    it('here you go', async (done: DoneFn) => {
        const buildEntitiesFunction: BuildEntitiesFunction = (): Entity[] =>
            [
                {
                    noteSpecs: [
                        {
                            durationSpec: { scalar: to.Scalar(3) },
                            gainSpec: { scalar: to.Scalar(3) },
                            pitchSpec: { scalar: to.Scalar(3) },
                            positionSpec: { scalar: to.Scalar(3) },
                            sustainSpec: { scalar: to.Scalar(3) },
                        },
                        {
                            durationSpec: { scalar: to.Scalar(2) },
                            gainSpec: { scalar: to.Scalar(2) },
                            pitchSpec: { scalar: to.Scalar(2) },
                            positionSpec: { scalar: to.Scalar(2) },
                            sustainSpec: { scalar: to.Scalar(2) },
                        },
                    ],
                    timbreName: TimbreNameEnum.SINE,
                },
                {
                    noteSpecs: [
                        {
                            durationSpec: {
                                index: to.Index(4),
                                scaleIndex: to.Index(1),
                            },
                            gainSpec: {
                                index: to.Index(1),
                                scaleIndex: to.Index(2),
                            },
                            pitchSpec: {
                                index: to.Index(2),
                                scaleIndex: to.Index(1),
                            },
                            positionSpec: {
                                index: to.Index(3),
                                scaleIndex: to.Index(2),
                            },
                            sustainSpec: {
                                index: to.Index(0),
                                scaleIndex: to.Index(1),
                            },
                        },
                    ],
                    timbreName: TimbreNameEnum.KICK,
                },
            ]

        const buildScalesFunction: BuildScalesFunction = (): Scale[] => [
            {
                scalars: [ 1 ].map(to.Scalar),
            },
            {
                scalars: [ 3, 5, 7, 11, 13 ].map(to.Scalar),
            },
            {
                scalars: [ 2, 4, 6, 8, 10 ].map(to.Scalar),
            },
        ]

        const material: Material = {
            buildEntitiesFunction,
            buildScalesFunction,
        }

        expect(JSON.stringify(await compilePattern({ material }), undefined, 2))
        // tslint:disable-next-line:no-require-imports
            .toEqual(JSON.stringify(require(`./snapshot`), undefined, 2))

        done()
    })
})
