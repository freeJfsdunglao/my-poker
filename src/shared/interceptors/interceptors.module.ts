import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';

import { LoggingWsInterceptor } from "./logging-ws.interceptor";

@Module({
    providers: [
        {
            provide: APP_INTERCEPTOR,
            useClass: LoggingWsInterceptor,
        }
    ]
})
export class InterceptorsModule {}
