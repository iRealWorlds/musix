import { User } from "@api/database/entities/user.entity";

export class IdentityDto {
    key: number;
    emailAddress: string;
    firstName: string;
    lastName: string;

    constructor(user: User) {
        this.key = user.id
        this.emailAddress = user.emailAddress;
        this.firstName = user.firstName;
        this.lastName = user.lastName;
    }
}