import { readFileSync } from 'fs';
import { join } from 'path';
import * as yaml from 'js-yaml';
import { plainToClass } from 'class-transformer';
import { IsEnum, IsNotEmpty, IsNumber, IsString, validateSync } from 'class-validator';
import 'dotenv-defaults/config';
import { LoggerLevel, LoggerTarget } from './app.logger';

export class Configuration {
    private static readonly YAML_CONFIG_FILENAME = 'config.yml';

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
    @IsString()
    AUTH__GOOGLE_CLIENT_ID: string;

    @IsNotEmpty()
    @IsString()
    AUTH__GOOGLE_CLIENT_SECRET: string;

    public static validate(environmentConfig: Record<string, unknown>) {
        const fileConfig = this.flattenObject(this.loadConfigurationFile());

        const config = this.mergeConfigs([fileConfig, environmentConfig]);

        const validatedConfig = plainToClass(this, config, { enableImplicitConversion: true });
        const errors = validateSync(validatedConfig, { skipMissingProperties: false });

        if (errors.length > 0) {
            throw new Error(errors.toString());
        }
        return validatedConfig;
    }

    private static mergeConfigs(configs: Record<string, unknown>[]) {
        const mergedConfig = {};

        for (const config of configs) {
            for (const key in config) {
                mergedConfig[key] = config[key];
            }
        }

        return mergedConfig;
    }

    private static loadConfigurationFile() {
        return yaml.load(readFileSync(join(__dirname, this.YAML_CONFIG_FILENAME), 'utf8'));
    }

    private static flattenObject(obj: any, delimiter = '__', parents = []) {
        const flattened = {};

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
