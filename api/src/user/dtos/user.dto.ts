import { User } from "@api/user/user.entity";

export class UserDto {
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