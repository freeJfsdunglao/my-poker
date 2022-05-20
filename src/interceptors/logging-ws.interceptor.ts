import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { LoggerService, LogLevel } from "src/logger/logger.service";

@Injectable()
export class LoggingWsInterceptor implements NestInterceptor {
    constructor(
        private readonly loggerService: LoggerService
    ) {}
    
    intercept(
        context: ExecutionContext, 
        next: CallHandler<any>
    ): Observable<any> | Promise<Observable<any>> {
        const now = Date.now();

        const clientSocket = context.getArgByIndex(0);

        this.loggerService.manualLoggingWithType({
            level: LogLevel.HTTP,
            context: LoggingWsInterceptor.name,
            message: 'Logging data received in gateway.',
            metaData: {
                inWhatGateway: context.getClass().name,
                handler: context.getHandler().name,
                data: context.getArgByIndex(1) || 'No Data.',
                handshake: clientSocket.handshake,
                connectionId: clientSocket.connectionId,
            },
        });
        
        return next.handle()
            .pipe(
                tap(() => console.log(`Done after ${Date.now() - now} ms`))
            );
    }
}