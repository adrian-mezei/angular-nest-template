import type { Config } from '@jest/types';

export default async (): Promise<Config.InitialOptions> => {
    return {
        testEnvironment: 'node',
        moduleFileExtensions: ['js', 'json', 'ts'],
        rootDir: 'src',
        testRegex: '.*\\.spec\\.ts$',
        transform: {
            '^.+\\.(t|j)s$': 'ts-jest',
        },
        collectCoverageFrom: ['**/*.(t|j)s'],
        coverageDirectory: '../coverage',
        coveragePathIgnorePatterns: [
            '/node_modules/',
            '.*\\.module\\.ts$',
            '.*\\.entity\\.ts$',
            'main\\.ts',
            'jwt-auth\\.guard\\.ts',
            'migrations',
        ],
        coverageThreshold: {
            global: {
                branches: 100,
                functions: 100,
                lines: 100,
                statements: 100,
            },
        },
    };
};
