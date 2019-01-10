module.exports = {
    spec_files: [
        'test/**/*.test.ts',
        'test/**/*.test.js',
        'test/**/*.test.tsx',
        'test/**/*.test.jsx',
    ],
    helpers: [
        'test/mockDom.ts',
        'test/setup.js',
        'test/setup.ts',
        'test/reporter.ts',
    ],
    oneFailurePerSpec: false,
    random: false,
}
