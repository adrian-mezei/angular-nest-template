import { ConfigModule, ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { AppConfig } from './app.config';
import { AppLoggerConfig } from './app.logger-config';

async function getConfigService(environmentVariablesOverride: Record<string, unknown> = {}): Promise<AppLoggerConfig> {
    const module: TestingModule = await Test.createTestingModule({
        imports: [
            ConfigModule.forRoot({
                validate: config => AppConfig.setupAndValidate({ ...config, ...environmentVariablesOverride }),
            }),
        ],
    }).compile();

    const configService = module.get<ConfigService<AppConfig>>(ConfigService);
    return new AppLoggerConfig(configService);
}

describe('AppLogger', () => {
    describe('getTransports', () => {
        it('should return a console transport if requested', async () => {
            const appLoggerConfig = await getConfigService({
                LOGGER__TARGET: 'console',
            });

            const transports = appLoggerConfig.getTransports();
            expect(transports.length).toBe(1);
            expect((transports[0] as any).name).toBe('console');
        });
    });

    describe('getTransports', () => {
        it('should return a file transport if requested', async () => {
            const appLoggerConfig = await getConfigService({
                LOGGER__TARGET: 'file',
            });

            const transports = appLoggerConfig.getTransports();
            expect(transports.length).toBe(1);
            expect((transports[0] as any).name).toBe('file');
        });
    });

    describe('getConsoleTransport', () => {
        it('should return a defined instance', async () => {
            const appLoggerConfig = await getConfigService();

            const transportInstance = appLoggerConfig['getConsoleTransport']();
            expect(transportInstance).toBeDefined();
        });
    });

    describe('getFileTransport', () => {
        it('should return a defined instance', async () => {
            const appLoggerConfig = await getConfigService();

            const transportInstance = appLoggerConfig['getFileTransport']();
            expect(transportInstance).toBeDefined();
        });
    });

    describe('getLogFormat', () => {
        it('should return a message with timestamp if machine format is requested', async () => {
            const appLoggerConfigMachine = await getConfigService({
                LOGGER__FORMAT: 'machine',
            });
            const formatMachine = appLoggerConfigMachine['getLogFormat']();
            const formattedMachine: any = formatMachine.transform({ level: 'error', message: 'helo' });

            expect(formattedMachine.timestamp).toBeDefined();
        });
    });

    describe('getLogFormat', () => {
        it('should return a message with timestamp if human format is requested', async () => {
            const appLoggerConfigHuman = await getConfigService({
                LOGGER__FORMAT: 'human',
            });
            const formatHuman = appLoggerConfigHuman['getLogFormat']();
            const formattedHuman: any = formatHuman.transform({ level: 'error', message: 'helo' });

            expect(formattedHuman.timestamp).toBeDefined();
        });
    });

    describe('getLogFormat', () => {
        it('should return a JSON message if machine format is requested', async () => {
            const appLoggerConfig = await getConfigService({
                LOGGER__FORMAT: 'machine',
            });

            const format = appLoggerConfig['getLogFormat']();
            const formatted: any = format.transform({ level: 'error', message: 'helo' });
            const messageString = formatted[Object.getOwnPropertySymbols(formatted)[0]];

            expect(() => JSON.parse(messageString)).not.toThrowError();
        });
    });

    describe('getLogFormat', () => {
        it('should return a non-JSON message if human format is requested', async () => {
            const appLoggerConfig = await getConfigService({
                LOGGER__FORMAT: 'human',
            });

            const format = appLoggerConfig['getLogFormat']();
            const formatted: any = format.transform({ level: 'error', message: 'helo' });
            const messageString = formatted[Object.getOwnPropertySymbols(formatted)[0]];

            expect(() => JSON.parse(messageString)).toThrowError();
        });
    });

    describe('getLogFormat', () => {
        it('should return a colorized human message if requested', async () => {
            const appLoggerConfig = await getConfigService({
                LOGGER__FORMAT: 'human',
                LOGGER__COLORIZE: true,
            });

            const format = appLoggerConfig['getLogFormat']();
            const formatted: any = format.transform({ level: 'error', message: 'helo' });
            const messageString: string = JSON.stringify(formatted[Object.getOwnPropertySymbols(formatted)[0]]);

            expect(messageString.substr(0, 7)).toBe('"\\u001b');
        });
    });

    describe('getLogFormat', () => {
        it('should return a non-colorized human message if requested', async () => {
            const appLoggerConfig = await getConfigService({
                LOGGER__FORMAT: 'human',
                LOGGER__COLORIZE: false,
            });

            const format = appLoggerConfig['getLogFormat']();
            const formatted: any = format.transform({ level: 'error', message: 'helo' });
            const messageString: string = JSON.stringify(formatted[Object.getOwnPropertySymbols(formatted)[0]]);

            expect(messageString.substr(0, 14)).toBe('"[NestWinston]');
        });
    });
});
