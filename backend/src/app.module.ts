import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { validate } from './app.config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';

@Module({
    imports: [AuthModule, ConfigModule.forRoot({ validate })],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
