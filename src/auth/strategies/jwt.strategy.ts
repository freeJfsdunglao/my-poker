import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { ConfigurationsService } from "src/configurations/configurations.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
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