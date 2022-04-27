import { Logger } from '@nestjs/common';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { NestFactory } from '@nestjs/core';

import { ApplicationModule } from './app.module';
import { ConfigurationsService } from './configurations/configurations.service';

async function bootstrap() {
  const logger = new Logger(ApplicationModule.name);

  const app = await NestFactory.create(ApplicationModule);
  const config = app.get(ConfigurationsService);

  if (config.willUseRabbitMQMicroservice) {
    app.connectMicroservice<MicroserviceOptions>({
      transport: Transport.RMQ,
      options: {
        urls: [ config.rabbitMQURL ],
        queue: config.rabbitMQListeningQueueName,
        noAck: false,
        queueOptions: {
          durable: false,
        },
      },
    });
  }

  /**
   * things will be added here if there are multiple microservices;
   * e.g.
   * || config.willUseRedisMicroservice
   */
  if (config.willUseRabbitMQMicroservice) {
    app.startAllMicroservices();
  }

  if (config.willUseControllers) {
    const PORT = config.portNumber;
    await app.listen(PORT, () => {
      logger.log(`Nest application is now listening to :${PORT} 🚗🚓🚕🛺🚙🚌`);
    });
  }

}
bootstrap();
