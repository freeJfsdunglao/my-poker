import { Inject, Injectable, Logger } from '@nestjs/common';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

import { ConfigurationsService } from 'src/shared/configurations/configurations.service';
import { 
    EnvironmentType,
    DEFAULT_LOG_CONTEXT,
    DEFAULT_LOG_LEVEL,
} from 'src/shared/common/constants';

export enum LogLevel {
    ERROR = 'error',
    WARN = 'warn',
    VERBOSE = 'verbose',
    DEBUG = 'debug',
    SILLY = 'silly',
    INFO = 'info',
    LOG = 'log',
    HTTP = 'http',
}

@Injectable()
export class LoggerService {
    constructor(
        @Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly logger: Logger,
        private readonly config: ConfigurationsService,
    ) {
        if (this.config.applicationLevel !== EnvironmentType.Production) {
            this.testLogging();
        }
    }

    public manualLoggingWithType(dto: any): void {
        const level = dto.logLevel || DEFAULT_LOG_LEVEL;
        const context = dto.context || DEFAULT_LOG_CONTEXT;
        const message: string = dto.message;
        const stack = dto.stack; // <-- note that i did not delete this just in case;
        
        delete dto.logLevel;
        delete dto.context;
        delete dto.message;

        const metaData = {...dto};
        
        switch (level) {
            case LogLevel.ERROR:
                this.logger.error(message, metaData, context, stack);
                break;
            case LogLevel.WARN:
                this.logger.warn(message, metaData, context);
                break;
            case LogLevel.VERBOSE:
                metaData.message = message;
                this.logger.verbose(metaData, context);
                break;
            case LogLevel.DEBUG:
                metaData.message = message;
                this.logger.debug(metaData, context);
                break;
            default: // silly, info, log, http
                this.logger.log({ level, message, metaData }, context);
        }
    }

    public log(message: string, context?: string, ...metaData: any): void {
        this.manualLoggingWithType({
            logLevel: LogLevel.LOG,
            message,
            context,
            metaData
        });
    }

    public info(message: string, context?: string, ...metaData: any): void {
        this.manualLoggingWithType({
            logLevel: LogLevel.INFO,
            message,
            context,
            metaData
        });
    }

    public silly(message: string, context?: string, ...metaData: any): void {
        this.manualLoggingWithType({
            logLevel: LogLevel.SILLY,
            message,
            context,
            metaData
        });
    }

    public debug(message: string, context?: string, ...metaData: any): void {
        this.manualLoggingWithType({
            logLevel: LogLevel.DEBUG,
            message,
            context,
            metaData
        });
    }

    public verbose(message: string, context?: string, ...metaData: any): void {
        this.manualLoggingWithType({
            logLevel: LogLevel.VERBOSE,
            message,
            context,
            metaData
        });
    }

    public warn(message: string, context?: string, ...metaData: any): void {
        this.manualLoggingWithType({
            logLevel: LogLevel.WARN,
            message,
            context,
            metaData
        });
    }

    public error(message: string, context?: string, ...metaData: any): void {
        this.manualLoggingWithType({
            logLevel: LogLevel.ERROR,
            message,
            context,
            metaData
        });
    }

    public testLogging(): void {
        this.logger.log(
            {
                level: 'info', 
                message: 'this is an info level log',
                objectData: {
                    label: 'check how this will be displayed',
                    timestamp: 'what?',
                    ms: '6',
                }
            }, 
            LoggerService.name
        );
        
        this.logger.log(LogLevel.INFO, LoggerService.name, { message: 'this is a info level' });
        this.logger.log(LogLevel.DEBUG, LoggerService.name, { message: 'this is a debug level' });
        this.logger.log(LogLevel.VERBOSE, LoggerService.name, { message: 'this is a verbose level' });
        this.logger.log(LogLevel.WARN, LoggerService.name, { message: 'this is a warn level' });
        this.logger.log(LogLevel.HTTP, LoggerService.name, { message: 'this is a http level' });

        this.logger.error('testing check on error logging');
        this.logger.warn('testing check on warn logging');
        this.logger.verbose('testing check on verbose logging');
        this.logger.log('testing check on log logging');

        this.logger.error({
            logLevel: LogLevel.DEBUG,
            message: 'this is the correct way of logging for winston [info]',
            context: 'CustomLogger',
            author: 'John Florentino D. Dunglao',
            check: 'this is an info level log',
            anotherKey: 'check?',
        });

        this.logger.warn({
            logLevel: LogLevel.DEBUG,
            message: 'this is the correct way of logging for winston [info]',
            context: 'CustomLogger',
            author: 'John Florentino D. Dunglao',
            check: 'this is an info level log',
            anotherKey: 'check?',
        });

        this.logger.verbose({
            logLevel: LogLevel.DEBUG,
            message: 'this is the correct way of logging for winston [info]',
            context: 'CustomLogger',
            author: 'John Florentino D. Dunglao',
            check: 'this is an info level log',
            anotherKey: 'check?',
        });

        this.manualLoggingWithType({
            logLevel: LogLevel.INFO,
            message: 'this is the correct way of logging for winston [info]',
            context: 'CustomLogger',
            author: 'John Florentino D. Dunglao',
            check: 'this is an info level log',
            anotherKey: 'check?',
        });

        this.manualLoggingWithType({
            logLevel: LogLevel.SILLY,
            message: 'this is the correct way of logging for winston [info]',
            context: 'CustomLogger',
            author: 'John Florentino D. Dunglao',
            check: 'this is an info level log',
            anotherKey: 'check?',
        });

        this.manualLoggingWithType({
            logLevel: LogLevel.DEBUG,
            message: 'this is the correct way of logging for winston [info]',
            context: 'CustomLogger',
            author: 'John Florentino D. Dunglao',
            check: 'this is an info level log',
            anotherKey: 'check?',
        });

        this.manualLoggingWithType({
            logLevel: LogLevel.ERROR,
            message: 'this is the correct way of logging for winston [info]',
            context: 'CustomLogger',
            author: 'John Florentino D. Dunglao',
            check: 'this is an info level log',
            anotherKey: 'check?',
        });

        this.manualLoggingWithType({
            logLevel: LogLevel.WARN,
            message: 'this is the correct way of logging for winston [info]',
            context: 'CustomLogger',
            author: 'John Florentino D. Dunglao',
            check: 'this is an info level log',
            anotherKey: 'check?',
        });

        this.manualLoggingWithType({
            logLevel: LogLevel.VERBOSE,
            message: 'this is the correct way of logging for winston [info]',
            context: 'CustomLogger',
            author: 'John Florentino D. Dunglao',
            check: 'this is an info level log',
            anotherKey: 'check?',
        });
    }
}
