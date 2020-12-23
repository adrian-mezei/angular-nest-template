import { readFileSync } from 'fs';
import { join } from 'path';
import * as yaml from 'js-yaml';
import { plainToClass } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString, validateSync } from 'class-validator';
import 'dotenv-defaults/config';

const YAML_CONFIG_FILENAME = 'config.yml';

export class Configuration {
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
    @IsString()
    AUTH__GOOGLE_CLIENT_ID: string;

    @IsNotEmpty()
    @IsString()
    AUTH__GOOGLE_CLIENT_SECRET: string;
}

export function validate(environmentConfig: Record<string, unknown>) {
    const fileConfig = flattenObject(loadConfigurationFile());

    const config = mergeConfigs([fileConfig, environmentConfig]);

    const validatedConfig = plainToClass(Configuration, config, { enableImplicitConversion: true });
    const errors = validateSync(validatedConfig, { skipMissingProperties: false });

    if (errors.length > 0) {
        throw new Error(errors.toString());
    }
    return validatedConfig;
}

function mergeConfigs(configs: Record<string, unknown>[]) {
    const mergedConfig = {};

    for (const config of configs) {
        for (const key in config) {
            mergedConfig[key] = config[key];
        }
    }

    return mergedConfig;
}

function loadConfigurationFile() {
    return yaml.load(readFileSync(join(__dirname, YAML_CONFIG_FILENAME), 'utf8'));
}

function flattenObject(obj: any, delimiter = '__', parents = []) {
    const flattened = {};

    Object.keys(obj).forEach(key => {
        if (typeof obj[key] === 'object' && obj[key] !== null) {
            parents.push(key);
            Object.assign(flattened, flattenObject(obj[key], delimiter, parents));
        } else {
            flattened[[...parents, key].join(delimiter)] = obj[key];
        }
    });

    return flattened;
}
