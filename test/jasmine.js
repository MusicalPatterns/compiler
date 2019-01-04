module.exports = {
    spec_files: [
        'test/**/*.test.ts',
        'test/**/*.test.js',
        'test/**/*.test.tsx',
        'test/**/*.test.jsx',
    ],
    helpers: [
        'test/setup.js',
        'test/setup.ts',
        'test/reporter.ts',
        'test/mockDom.ts',
    ],
    oneFailurePerSpec: false,
    random: false,
}
