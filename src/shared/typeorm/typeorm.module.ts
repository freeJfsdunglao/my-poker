import { Module } from '@nestjs/common';
import { TypeOrmModule as NestTypeOrmModule, TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { createConnection } from 'typeorm';
import { join } from 'path';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

import { ConfigurationsService } from '../configurations/configurations.service';

import { BASE_DIR } from '../common/constants';

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
                entities: [join(BASE_DIR, '/**/*.entity{.ts,.js}')],
                synchronize: true,
                namingStrategy: new SnakeNamingStrategy(),
            }),
            connectionFactory: async (options) => {
                const connection = await createConnection(options);
                return connection;
            },
        }),
    ],
})
export class TypeormModule {}
