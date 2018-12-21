module.exports = {
    spec_files: [
        'test/src/**/*.ts',
        'test/src/**/*.js',
        'test/src/**/*.tsx',
        'test/src/**/*.jsx',
        'src/**/test/src/**/*.ts',
        'src/**/test/src/**/*.js',
        'src/**/test/src/**/*.tsx',
        'src/**/test/src/**/*.jsx',
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
