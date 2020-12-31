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
        coveragePathIgnorePatterns: ['/node_modules/', '.*\\.module\\.ts$', 'main\\.ts', 'jwt-auth\\.guard\\.ts'],
    };
};
