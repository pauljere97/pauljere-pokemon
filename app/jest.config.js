module.exports = {
    preset: 'jest-preset-angular',
    roots: ['<rootDir>/src/'],
    setupFilesAfterEnv: ['<rootDir>/src/setup-jest.ts'],
    testMatch: ['**/+(*.)+(spec|test).+(ts|js)?(x)'],
    transform: {
        '^.+\\.(ts|html)$': 'ts-jest',
    },
    transformIgnorePatterns: [
        'node_modules/(?!@ngrx|(?!deck.gl)|ng-dynamic)',
    ],
    collectCoverage: true,
    coverageReporters: ['html'],
    moduleNameMapper: {
        '@app/(.*)': '<rootDir>/src/app/$1',
        '@assets/(.*)': '<rootDir>/src/assets/$1',
        '@environments/(.*)': '<rootDir>/src/environments/$1',
    },
    testEnvironment: 'jsdom',
};
