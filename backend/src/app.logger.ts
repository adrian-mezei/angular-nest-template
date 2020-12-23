import * as winston from 'winston';
import { utilities as nestWinstonModuleUtilities } from 'nest-winston';
import { ConfigService } from '@nestjs/config';

export enum LoggerTarget {
    console = 'console',
    file = 'file',
}

export enum LoggerLevel {
    error = 'error',
    warn = 'warn',
    info = 'info',
    debug = 'debug',
}

export class LoggerConfiguration {
    public static getTransports(configService: ConfigService) {
        const loggerTarget = configService.get<LoggerTarget>('LOGGER__TARGET');
        const loggerLevel = configService.get<LoggerLevel>('LOGGER__LEVEL');

        const transports = [];

        if (loggerTarget === LoggerTarget.console) {
            transports.push(this.getConsoleTransport(loggerLevel));
        }

        if (loggerTarget === LoggerTarget.file) {
            transports.push(this.getFileTransport(loggerLevel));
        }

        return transports;
    }

    private static getConsoleTransport(loggerLevel: LoggerLevel) {
        const consoleTransport = new winston.transports.Console({
            level: loggerLevel.toString(),
            format: winston.format.combine(winston.format.timestamp(), nestWinstonModuleUtilities.format.nestLike()),
        });

        return consoleTransport;
    }

    private static getFileTransport(loggerLevel: LoggerLevel) {
        const fileTransport = new winston.transports.File({
            filename: 'error.log',
            level: loggerLevel.toString(),
            format: winston.format.json(),
        });
        return fileTransport;
    }
}
