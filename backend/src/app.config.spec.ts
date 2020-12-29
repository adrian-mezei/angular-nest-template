import { AppConfig } from './app.config';

const testConfigurationFileContent = {
    HOST: 'localhost',
    PORT: 3000,
    BASE_PATH: 'api',

    LOGGER: {
        TARGET: 'console',
        LEVEL: 'debug',
        FORMAT: 'human',
        COLORIZE: true,
        FILE_OPTIONS: {
            FOLDER_PATH: 'logs',
            MAX_SIZE_BYTES: 5000000,
            MAX_FILES_COUNT: 10,
        },
    },

    AUTH: {
        JWT_SECRET: 'very-secret',
        GOOGLE_OAUTH20: {
            ENABLED: false,
            GOOGLE_CLIENT_ID: '',
            GOOGLE_CLIENT_SECRET: '',
        },
    },
};

describe('AppConfig', () => {
    describe('loadConfigurationFile', () => {
        const config = AppConfig['loadConfigurationFile']();
        expect(config).not.toBe(undefined);
    });

    describe('setupAndValidate', () => {
        // override config file loader
        AppConfig['loadConfigurationFile'] = () => testConfigurationFileContent;

        it('should use both config file and environment variables', () => {
            const environment = { SOMETHING_ELSE: 'test' };
            const config = AppConfig.setupAndValidate(environment);

            expect(config.PORT).not.toBe(undefined);
            expect((config as any).SOMETHING_ELSE).not.toBe(undefined);
        });

        it('should overwrite config file variables with environment variables', () => {
            const environment = { PORT: 3100 };
            const config = AppConfig.setupAndValidate(environment);

            expect(config.PORT).toBe(3100);
        });

        it('should automatically implicitly convert environment variables strings to desired types', () => {
            const environment = { PORT: '3100', LOGGER__COLORIZE: 'true' };
            const config = AppConfig.setupAndValidate(environment);

            expect(typeof config.PORT).toBe('number');
            expect(typeof config.LOGGER__COLORIZE).toBe('boolean');
        });

        it('should convert environment variables boolean string "true" to boolean true', () => {
            const environment = { LOGGER__COLORIZE: 'true' };
            const config = AppConfig.setupAndValidate(environment);

            expect(config.LOGGER__COLORIZE).toBe(true);
        });

        it('should convert environment variables boolean string "false" to boolean false', () => {
            const environment = { LOGGER__COLORIZE: 'false' };
            const config = AppConfig.setupAndValidate(environment);

            expect(config.LOGGER__COLORIZE).toBe(false);
        });

        it('should validate variables', () => {
            const environment = { PORT: 'hello' };

            expect(() => AppConfig.setupAndValidate(environment)).toThrowError();
        });
    });

    describe('mergeConfigs', () => {
        it('should merge all received configs', () => {
            const config1 = { A: 'test-a' };
            const config2 = { B: 'test-b' };
            const config3 = { C: 'test-c' };
            const config = AppConfig['mergeConfigs']([config1, config2, config3]);

            expect(config.A).toBe('test-a');
            expect(config.B).toBe('test-b');
            expect(config.C).toBe('test-c');
        });

        it('should merge received configs in order so that the later overrides the earlier', () => {
            const config1 = { A: 'test-a' };
            const config2 = { A: 'test-override' };

            const config = AppConfig['mergeConfigs']([config1]);
            expect(config.A).toBe('test-a');

            const configOverwritten = AppConfig['mergeConfigs']([config1, config2]);
            expect(configOverwritten.A).toBe('test-override');
        });
    });

    describe('convertBooleanFalseStrings', () => {
        it('should convert strings of boolean "false" values to booleans', () => {
            const config = AppConfig['convertBooleanFalseStrings']({ a: 'false', b: false });

            expect(typeof config.a).toBe('boolean');
            expect(typeof config.b).toBe('boolean');

            expect(config.a).toBe(false);
            expect(config.b).toBe(false);
        });

        it('should do nothing to strings of boolean "true" values', () => {
            const config = AppConfig['convertBooleanFalseStrings']({ a: 'true', b: true });

            expect(typeof config.a).toBe('string');
            expect(typeof config.b).toBe('boolean');

            expect(config.a).toBe('true');
            expect(config.b).toBe(true);
        });
    });

    describe('flattenObject', () => {
        it('should flatten a hierarchic object to a simple key value object', () => {
            const obj = {
                a: {
                    b: {
                        c: 'magic',
                    },
                },
            };
            const delimiter = '___';

            const flattened = AppConfig['flattenObject'](obj, delimiter);

            expect(flattened.a___b___c).toBe('magic');
        });
    });
});
