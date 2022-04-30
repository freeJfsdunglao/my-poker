import { Inject, Injectable, Logger } from '@nestjs/common';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

import { ConfigurationsService } from 'src/configurations/configurations.service';
import { 
    EnvironmentType,
    DEFAULT_LOG_CONTEXT,
    DEFAULT_LOG_LEVEL,
} from 'src/common/constants';

@Injectable()
export class LoggerService {
    constructor(
        @Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly logger: Logger,
        private readonly config: ConfigurationsService,
    ) {
        if (config.applicationLevel !== EnvironmentType.Production) {
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
            case 'error':
                this.logger.error(message, metaData, stack, context);
                break;
            case 'warn':
                this.logger.warn(message, metaData, context);
                break;
            case 'verbose':
                metaData.message = message;
                this.logger.verbose(metaData, context);
                break;
            case 'debug':
                metaData.message = message;
                this.logger.debug(metaData, context);
                break;
            default: // silly, info, log, http
                this.logger.log({ level, message, metaData }, context);
        }
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
        
        this.logger.log('info', LoggerService.name, { message: 'this is a info level' });
        this.logger.log('debug', LoggerService.name, { message: 'this is a debug level' });
        this.logger.log('verbose', LoggerService.name, { message: 'this is a verbose level' });
        this.logger.log('warn', LoggerService.name, { message: 'this is a warn level' });
        this.logger.log('http', LoggerService.name, { message: 'this is a http level' });

        this.logger.error('testing check on error logging');
        this.logger.warn('testing check on warn logging');
        this.logger.verbose('testing check on verbose logging');
        this.logger.log('testing check on log logging');

        this.logger.error({
            logLevel: 'debug',
            message: 'this is the correct way of logging for winston [info]',
            context: 'CustomLogger',
            author: 'John Florentino D. Dunglao',
            check: 'this is an info level log',
            anotherKey: 'check?',
        });

        this.logger.warn({
            logLevel: 'debug',
            message: 'this is the correct way of logging for winston [info]',
            context: 'CustomLogger',
            author: 'John Florentino D. Dunglao',
            check: 'this is an info level log',
            anotherKey: 'check?',
        });

        this.logger.verbose({
            logLevel: 'debug',
            message: 'this is the correct way of logging for winston [info]',
            context: 'CustomLogger',
            author: 'John Florentino D. Dunglao',
            check: 'this is an info level log',
            anotherKey: 'check?',
        });

        this.manualLoggingWithType({
            logLevel: 'info',
            message: 'this is the correct way of logging for winston [info]',
            context: 'CustomLogger',
            author: 'John Florentino D. Dunglao',
            check: 'this is an info level log',
            anotherKey: 'check?',
        });

        this.manualLoggingWithType({
            logLevel: 'silly',
            message: 'this is the correct way of logging for winston [info]',
            context: 'CustomLogger',
            author: 'John Florentino D. Dunglao',
            check: 'this is an info level log',
            anotherKey: 'check?',
        });

        this.manualLoggingWithType({
            logLevel: 'debug',
            message: 'this is the correct way of logging for winston [info]',
            context: 'CustomLogger',
            author: 'John Florentino D. Dunglao',
            check: 'this is an info level log',
            anotherKey: 'check?',
        });

        this.manualLoggingWithType({
            logLevel: 'error',
            message: 'this is the correct way of logging for winston [info]',
            context: 'CustomLogger',
            author: 'John Florentino D. Dunglao',
            check: 'this is an info level log',
            anotherKey: 'check?',
        });

        this.manualLoggingWithType({
            logLevel: 'warn',
            message: 'this is the correct way of logging for winston [info]',
            context: 'CustomLogger',
            author: 'John Florentino D. Dunglao',
            check: 'this is an info level log',
            anotherKey: 'check?',
        });

        this.manualLoggingWithType({
            logLevel: 'verbose',
            message: 'this is the correct way of logging for winston [info]',
            context: 'CustomLogger',
            author: 'John Florentino D. Dunglao',
            check: 'this is an info level log',
            anotherKey: 'check?',
        });
    }
}
