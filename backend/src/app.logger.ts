import * as winston from 'winston';
import { utilities as nestWinstonModuleUtilities } from 'nest-winston';
import { ConfigService } from '@nestjs/config';
import { Configuration } from './app.config';

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

export enum LoggerFormat {
    human = 'human',
    machine = 'machine',
}

export class LoggerConfiguration {
    loggerTarget: LoggerTarget;
    loggerLevel: LoggerLevel;
    loggerFormat: LoggerFormat;
    loggerColorize: boolean;
    loggerFolderPath: string;
    loggerMaxSizeBytes: number;
    loggerMaxFilesCount: number;

    constructor(configService: ConfigService<Configuration>) {
        this.loggerTarget = configService.get<LoggerTarget>('LOGGER__TARGET');
        this.loggerLevel = configService.get<LoggerLevel>('LOGGER__LEVEL');
        this.loggerFormat = configService.get<LoggerFormat>('LOGGER__FORMAT');
        this.loggerColorize = configService.get<boolean>('LOGGER__COLORIZE');
        this.loggerFolderPath = configService.get<string>('LOGGER__FILE_OPTIONS__FOLDER_PATH');
        this.loggerMaxSizeBytes = configService.get<number>('LOGGER__FILE_OPTIONS__MAX_SIZE_BYTES');
        this.loggerMaxFilesCount = configService.get<number>('LOGGER__FILE_OPTIONS__MAX_FILES_COUNT');
    }

    public getTransports() {
        const transports = [];

        if (this.loggerTarget === LoggerTarget.console) {
            transports.push(this.getConsoleTransport());
        }

        if (this.loggerTarget === LoggerTarget.file) {
            transports.push(this.getFileTransport());
        }

        return transports;
    }

    private getConsoleTransport() {
        const consoleTransport = new winston.transports.Console({
            level: this.loggerLevel.toString(),
            format: this.getLogFormat(),
        });

        return consoleTransport;
    }

    private getFileTransport() {
        const fileTransport = new winston.transports.File({
            filename: 'error.log',
            dirname: this.loggerFolderPath,
            level: this.loggerLevel.toString(),
            maxsize: this.loggerMaxSizeBytes,
            maxFiles: this.loggerMaxFilesCount,
            format: this.getLogFormat(),
        });
        return fileTransport;
    }

    private getLogFormat() {
        let format = winston.format.timestamp();

        if (this.loggerFormat === LoggerFormat.human) {
            format = winston.format.combine(format, nestWinstonModuleUtilities.format.nestLike());
        }

        if (this.loggerFormat === LoggerFormat.machine) {
            format = winston.format.combine(format, winston.format.json());
        }

        if (!this.loggerColorize) {
            format = winston.format.combine(format, winston.format.uncolorize());
        }

        return format;
    }
}
