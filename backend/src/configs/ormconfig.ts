import { Test } from '@nestjs/testing';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppConfig } from './app.config';

// This is only for TypeORM CLI, so that ormconfig can be provided.
async function getTypeOrmConfig() {
    const module = await Test.createTestingModule({
        imports: [
            ConfigModule.forRoot({
                validate: config => AppConfig.setupAndValidate(process.env),
            }),
        ],
    }).compile();
    const configService = module.get<ConfigService<AppConfig>>(ConfigService);

    return AppConfig.getTypeOrmConfig(configService);
}

export = getTypeOrmConfig();
