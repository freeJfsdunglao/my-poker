import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { JWT_STRATEGY_NAME } from "src/shared/common/constants";
import { ConfigurationsService } from "src/shared/configurations/configurations.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, JWT_STRATEGY_NAME) {
    constructor(
        protected readonly config: ConfigurationsService,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: config.jwtSecretKey,
        });
    }

    async validate(payload: any) {
        return {
            userId: payload.sub,
            username: payload.username,
        };
    }
}