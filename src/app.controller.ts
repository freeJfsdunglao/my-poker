import { Controller, Get, HttpException, HttpStatus, Inject } from '@nestjs/common';
import { 
    ClientProxy,
    Ctx, 
    MessagePattern, 
    Payload, 
    RmqContext 
} from '@nestjs/microservices';

import { AppService } from './app.service';

import { MicroserviceList } from './common/constants';
import { LoggerService } from './logger/logger.service';

@Controller()
export class AppController {
    // private readonly logger = new Logger(AppController.name);
    
    constructor(
        private readonly appService: AppService,
        private readonly logger: LoggerService,
        @Inject(MicroserviceList.DEFAULT) private readonly defaultClient: ClientProxy,
    ) {}
    
    private _acknowledgeMessage(context: RmqContext): void {
        const channel = context.getChannelRef();
        const originalMsg = context.getMessage();
        
        channel.ack(originalMsg);
    }
    
    @Get()
    getHello(): string {
        return this.appService.getHello();
    }
    
    @Get('/first-pattern')
    sendFirstPattern(): string {
        this.defaultClient.emit({ cmd: 'application_first_pattern' }, [1, 2, 3]);
        return 'done emitting data';
    }
    
    @MessagePattern({ cmd: 'application_first_pattern' })
    handleFirstPattern(
        @Payload() data: number[], 
        @Ctx() context: RmqContext
    ): void {
        this.logger.manualLoggingWithType({
            logLevel: 'verbose',
            context: AppController.name,
            message: 'RMQ pattern application_first_pattern',
            metaData: data,
        });
        
        this._acknowledgeMessage(context);
    }

    @Get('/test-logger')
    handleLoggerService(): void {
        this.logger.manualLoggingWithType({
            logLevel: 'verbose',
            context: AppController.name,
            message: 'testing of the custom logger service.',
        });
    }

    @Get('/test-http-exception')
    handleTestingOfException(): void {
        throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }

    @Get('/test-general-error-handler')
    handleTestingOfGeneralError(): void {
        throw new Error('Hi. This is a testing of checking the error handler.');
    }
}
        