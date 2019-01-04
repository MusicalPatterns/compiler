const ESCAPE_COMPILER_NODE_MODULES_FOR_PATTERN_FOR_REQIRING = '../../../../'

require(`${ESCAPE_COMPILER_NODE_MODULES_FOR_PATTERN_FOR_REQIRING}test/mockDom`)
const { appendFileSync, existsSync, unlinkSync } = require('fs')
const { compilePattern } = require('../dist')

const updateSnapshot = async () => {
    const { pattern } = require(`${ESCAPE_COMPILER_NODE_MODULES_FOR_PATTERN_FOR_REQIRING}src`)
    const snapshot = await compilePattern(pattern)

    const snapshotFile = 'src/snapshot.json'
    existsSync(snapshotFile) && unlinkSync(snapshotFile)
    appendFileSync(snapshotFile, JSON.stringify(snapshot, null, 2))
}

updateSnapshot()
    .then()
    .catch()
