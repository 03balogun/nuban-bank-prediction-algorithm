const { createDefaultPreset } = require('ts-jest')

module.exports = {
    transform: {
        ...createDefaultPreset().transform,
    },
    moduleFileExtensions: [
        'js',
        'ts',
    ],
    testMatch: [
        '**/*.test.(ts|js)',
    ],
    testEnvironment: 'node',
    preset: 'ts-jest',
};