import { Module } from '@nestjs/common';
import { 
	ClientsModule, 
	ClientProxyFactory, 
	Transport, 
} from '@nestjs/microservices';

import { ConfigurationsService } from '../../configurations/configurations.service';

import { MicroserviceList } from '../../common/constants';

/**
 * https://docs.nestjs.com/microservices/basics#client
 */
@Module({
	providers: [
		{
			provide: MicroserviceList.DEFAULT,
			inject: [ConfigurationsService],
			useFactory: (config: ConfigurationsService) => {
				return ClientProxyFactory.create({
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
			},
		}
	],
	exports: [ MicroserviceList.DEFAULT ],
})
export class DefaultClientModule {}
