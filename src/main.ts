import { Logger } from '@nestjs/common';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { NestFactory } from '@nestjs/core';

import { ApplicationModule } from './app.module';
import { ConfigurationsService } from 'src/shared/configurations/configurations.service';
import { RedisIoAdapter } from 'src/shared/redis/redis-io.adapter';

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

    if (config.willUseRedisCaching) {
        // const redisIoAdapter = new RedisIoAdapter(app, config);
        // await redisIoAdapter.connectToRedis();
        // app.useWebSocketAdapter(redisIoAdapter);
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
