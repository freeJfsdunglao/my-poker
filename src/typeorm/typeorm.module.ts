import { Module } from '@nestjs/common';
import { TypeOrmModule as NestTypeOrmModule, TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { createConnection } from 'typeorm';

import { ConfigurationsService } from '../configurations/configurations.service';

@Module({
    imports: [
        NestTypeOrmModule.forRootAsync({
            inject: [ConfigurationsService],
            useFactory: (config: ConfigurationsService) => ({
                type: 'mysql',
                host: config.databaseHost,
                port: config.databasePort,
                username: config.databaseUsername,
                password: config.databasePassword,
                database: config.databaseName,
                entities: [__dirname + '/**/*.entity{.ts,.js}'],
                synchronize: true,
            }),
            connectionFactory: async (options) => {
                const connection = await createConnection(options);
                return connection;
            },
        }),
    ],
})
export class TypeormModule {}
