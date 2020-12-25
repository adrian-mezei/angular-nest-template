import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { Configuration } from './app.config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GoogleAuthModule } from './auth/google-auth/google-auth.module';
import { LocalAuthModule } from './auth/local-auth/local-auth.module';

@Module({
    imports: [
        GoogleAuthModule,
        ConfigModule.forRoot({ validate: config => Configuration.validate(config) }),
        LocalAuthModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
