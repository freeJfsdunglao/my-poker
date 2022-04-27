import { Controller, Get, Inject, Logger } from '@nestjs/common';
import { 
  ClientProxy,
  Ctx, 
  MessagePattern, 
  Payload, 
  RmqContext 
} from '@nestjs/microservices';

import { AppService } from './app.service';

import { MicroserviceList } from './common/constants';

@Controller()
export class AppController {
  private readonly logger = new Logger(AppController.name);

  constructor(
    private readonly appService: AppService,
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
    this.logger.verbose(data);

    this._acknowledgeMessage(context);
  }
}
