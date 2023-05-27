import { User } from "@api/user/user.entity";
import * as crypto from "crypto";

export class JwtPayloadDto {
    public sub: number;
    public iat: number;
    public jti: string;

    constructor(user: User) {
        this.sub = user.id;
        this.iat = Math.floor(new Date().getTime() / 1000);
        this.jti = crypto.randomUUID().toString();
    }
}