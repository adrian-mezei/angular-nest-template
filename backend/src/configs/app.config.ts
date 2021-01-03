import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { IsBoolean, IsEnum, IsNotEmpty, IsNumber, IsString, ValidateIf, validateSync } from 'class-validator';
import 'dotenv/config';
import { LoggerFormat, LoggerLevel, LoggerTarget } from './app.logger-config';
import configFile from './config.json';
import path from 'path';

export class AppConfig {
    @IsNotEmpty()
    @IsString()
    HOST: string;

    @IsNotEmpty()
    @IsNumber()
    PORT: number;

    @IsNotEmpty()
    @IsString()
    BASE_PATH: string;

    @IsNotEmpty()
    @IsEnum(LoggerTarget)
    LOGGER__TARGET: string;

    @IsNotEmpty()
    @IsEnum(LoggerLevel)
    LOGGER__LEVEL: string;

    @IsNotEmpty()
    @IsEnum(LoggerFormat)
    LOGGER__FORMAT: string;

    @IsNotEmpty()
    @IsBoolean()
    LOGGER__COLORIZE: boolean;

    @IsNotEmpty()
    @IsString()
    LOGGER__FILE_OPTIONS__FOLDER_PATH: string;

    @IsNotEmpty()
    @IsNumber()
    LOGGER__FILE_OPTIONS__MAX_SIZE_BYTES: number;

    @IsNotEmpty()
    @IsNumber()
    LOGGER__FILE_OPTIONS__MAX_FILES_COUNT: number;

    @IsNotEmpty()
    @IsBoolean()
    AUTH__GOOGLE_OAUTH20__ENABLED: boolean;

    @IsNotEmpty()
    @IsString()
    @ValidateIf(c => c.AUTH__GOOGLE_OAUTH20__ENABLED)
    AUTH__GOOGLE_OAUTH20__CLIENT_ID: string;

    @IsNotEmpty()
    @IsString()
    @ValidateIf(c => c.AUTH__GOOGLE_OAUTH20__ENABLED)
    AUTH__GOOGLE_OAUTH20__CLIENT_SECRET: string;

    @IsNotEmpty()
    @IsString()
    AUTH__JWT_SECRET: string;

    @IsNotEmpty()
    @IsString()
    DB__HOST: string;

    @IsNotEmpty()
    @IsNumber()
    DB__PORT: number;

    @IsNotEmpty()
    @IsString()
    DB__USERNAME: string;

    @IsNotEmpty()
    @IsString()
    DB__PASSWORD: string;

    @IsNotEmpty()
    @IsString()
    DB__DATABASE_NAME: string;

    static getTypeOrmConfig(configService: ConfigService<AppConfig>): TypeOrmModuleOptions {
        return {
            type: 'postgres',
            host: configService.get<string>('DB__HOST'),
            port: configService.get<number>('DB__PORT'),
            username: configService.get<string>('DB__USERNAME'),
            password: configService.get<string>('DB__PASSWORD'),
            database: configService.get<string>('DB__DATABASE_NAME'),
            entities: [path.join(__dirname, '../**/*.entity{.ts,.js}')],
            migrations: [path.join(__dirname, '../migrations/*')],
            cli: {
                migrationsDir: 'src/migrations',
            },
        };
    }

    public static setupAndValidate(environmentConfig: Record<string, unknown>) {
        const configFileFlattened = this.flattenObject(this.loadConfigurationFile());

        let config = this.mergeConfigs([configFileFlattened, environmentConfig]);
        config = this.convertBooleanFalseStrings(config); // class-transformer turns 'false' string into true, issue: https://github.com/typestack/class-transformer/issues/306

        const validatedConfig = plainToClass(this, config, { enableImplicitConversion: true });
        const errors = validateSync(validatedConfig, { skipMissingProperties: false });

        if (errors.length > 0) {
            throw new Error(errors.toString());
        }
        return validatedConfig;
    }

    private static mergeConfigs(configs: Record<string, unknown>[]): Record<string, unknown> {
        const mergedConfig = {};

        for (const config of configs) {
            for (const key in config) {
                mergedConfig[key] = config[key];
            }
        }

        return mergedConfig;
    }

    private static loadConfigurationFile(): Record<string, unknown> {
        return configFile;
    }

    private static convertBooleanFalseStrings(config: Record<string, unknown>): Record<string, unknown> {
        const fixedConfig = Object.assign({}, config);

        for (const key in config) {
            if (typeof config[key] === 'string' && (config[key] as string).toUpperCase() === 'FALSE') {
                fixedConfig[key] = false;
            }
        }

        return fixedConfig;
    }

    private static flattenObject(obj: any, delimiter = '__', parents: string[] = []): Record<string, unknown> {
        const flattened: Record<string, unknown> = {};

        Object.keys(obj).forEach(key => {
            if (typeof obj[key] === 'object' && obj[key] !== null) {
                const newParents = [...parents, key];
                Object.assign(flattened, this.flattenObject(obj[key], delimiter, newParents));
            } else {
                flattened[[...parents, key].join(delimiter)] = obj[key];
            }
        });

        return flattened;
    }
}
