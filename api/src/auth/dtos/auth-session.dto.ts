import { User } from "@api/user/user.entity";
import { IdentityDto } from "@api/auth/dtos/identity.dto";

export class AuthSessionDto {
    token: string;
    identity: IdentityDto;

    constructor(jwt: string, user: User) {
        this.token = jwt;
        this.identity = new IdentityDto(user);
    }
}