import { User } from "@api/user/user.entity";
import { IdentityDto } from "@api/auth/dtos/identity.dto";

export class AuthSessionDto {
    jwt: string;
    identity: IdentityDto;

    constructor(jwt: string, user: User) {
        this.jwt = jwt;
        this.identity = new IdentityDto(user);
    }
}