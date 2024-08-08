import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";

@Injectable()
export class AtJwtStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor(){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: 'at-secret'
        })
    }

    async validate(payload: any){
        return payload;
    }
}