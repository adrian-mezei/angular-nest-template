import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { Configuration } from './app.config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/google-auth/auth.module';

@Module({
    imports: [AuthModule, ConfigModule.forRoot({ validate: config => Configuration.validate(config) })],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
