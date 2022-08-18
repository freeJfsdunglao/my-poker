import { INestApplicationContext } from "@nestjs/common";
import { IoAdapter } from "@nestjs/platform-socket.io";
import { createAdapter } from "@socket.io/redis-adapter";
import { createClient } from "redis";
import { ServerOptions } from "socket.io";
import { ConfigurationsService } from "src/shared/configurations/configurations.service";

export class RedisIoAdapter extends IoAdapter {
    private adapterConstructor: ReturnType<typeof createAdapter>;

    constructor(
        private app: INestApplicationContext,
        private readonly config: ConfigurationsService
    ) {
        super(app);
    }

    async connectToRedis(): Promise<void> {
        const pubClient = createClient({
            socket: {
                host: this.config.redisHost,
                port: this.config.redisPort,
            },
        });
        const subClient = pubClient.duplicate();

        await Promise.all([ pubClient.connect(), subClient.connect() ]);

        this.adapterConstructor = createAdapter(pubClient, subClient);
    }

    createIOServer(port: number, options?: ServerOptions) {
        const server = super.createIOServer(port, options);
        return server;
    }
}
