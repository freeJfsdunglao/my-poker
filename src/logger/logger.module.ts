import { Module } from '@nestjs/common';
import { utilities as nestWinstonUtilities, WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import 'winston-daily-rotate-file';

import { ConfigurationsService } from 'src/configurations/configurations.service';
import { LoggerService } from './logger.service';

import {
    BASE_DIR,
    DEBUGGING_LOG_NAME,
    EnvironmentType,
    LOG_DATETIME_FORMAT,
} from 'src/common/constants';

export const DAILY_LOG_ROTATION_DATETIME_FORMAT = 'YYYY-MM-DD';

const isEnvProduction = (config: ConfigurationsService) => {
    return config.applicationLevel === EnvironmentType.Production;
};

@Module({
    imports: [
        WinstonModule.forRootAsync({
            inject: [ConfigurationsService],
            useFactory: (config: ConfigurationsService) => ({
                levels: winston.config.npm.levels,
                level: isEnvProduction(config) ? 'info' : 'silly',
                format: winston.format.combine( 
                    winston.format.timestamp({
                        format: LOG_DATETIME_FORMAT,
                    }),
                    winston.format.errors({ stack: true }), 
                    winston.format.splat(),
                    winston.format.json(),
                ),
                transports: [
                    new winston.transports.Console({
                        format: winston.format.combine(
                            winston.format.timestamp(),
                            winston.format.align(),
                            nestWinstonUtilities.format.nestLike(
                                DEBUGGING_LOG_NAME,
                                { prettyPrint: true }
                            ),
                        ),
                    }),
                    new winston.transports.DailyRotateFile({
                        level: 'warn',
                        filename: BASE_DIR + 'logs/error/error-%DATE%.log',
                        datePattern: DAILY_LOG_ROTATION_DATETIME_FORMAT,
                        maxFiles: '1m',
                    }),
                    new winston.transports.DailyRotateFile({
                        level: 'silly',
                        filename: BASE_DIR + 'logs/info/application-%DATE%.log',
                        datePattern: DAILY_LOG_ROTATION_DATETIME_FORMAT,
                        maxFiles: '1m',
                    }),
                ],
            }),
        }),
    ],
    providers: [LoggerService],
    exports: [LoggerService],
})
export class LoggerModule {}
