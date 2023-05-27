import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { UserCreateDto } from "@api/user/dtos/user-create.dto";
import { UserService } from "@api/user/user.service";
import { User } from "@api/user/user.entity";
import * as bcrypt from "bcrypt";
import { UserDto } from "@api/user/dtos/user.dto";

@Controller('users')
export class UserController {
    /**
     * UserController constructor method.
     *
     * @param _userService
     */
    constructor(
        private readonly _userService: UserService
    ) {
    }

    /**
     * Create a new user.
     *
     * @param data
     */
    @HttpCode(HttpStatus.CREATED)
    @Post()
    async create(@Body() data: UserCreateDto) {
        // Create a new user object from the request data
        let user = new User();
        user.emailAddress = data.email;
        user.firstName = data.firstName;
        user.lastName = data.lastName;
        const salt = await bcrypt.genSalt();
        user.passwordHash = await bcrypt.hash(data.password, salt)

        // Persist the user to the database
        user = await this._userService.create(user);

        // Return the newly created user
        return new UserDto(user);
    }
}
