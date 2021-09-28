import type { Config } from '@jest/types';
import { AppConfig } from 'src/configs/app.config';

export default async (): Promise<Config.InitialOptions> => {
    return {
        testEnvironment: 'node',
        moduleFileExtensions: ['js', 'json', 'ts'],
        rootDir: '.',
        testRegex: '.*\\.e2e-spec\\.ts$',
        transform: {
            '^.+\\.(t|j)s$': 'ts-jest',
        },
    };
};

process.env = Object.assign(process.env, {
    AUTH__LOCAL__ENABLED: true,
    DB__DATABASE_NAME: 'angular-nest-template-e2e',
} as Partial<AppConfig>);
