import {
    BadRequestException,
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Post,
    Req,
    UnauthorizedException,
    UseGuards
} from '@nestjs/common';
import { AuthService } from "@api/auth/auth.service";
import { AuthGuard } from "@api/auth/auth.guard";
import { Request } from 'express';
import { SessionCreateDto } from "@api/auth/dtos/session-create.dto";
import { UserService } from "@api/user/user.service";
import { AuthSessionDto } from "@api/auth/dtos/auth-session.dto";
import { User } from "@api/user/user.entity";

@Controller('auth-sessions')
export class AuthController {
    /**
     * AuthController constructor method.
     *
     * @param _authService
     * @param _userService
     */
    constructor(
        private readonly _authService: AuthService,
        private readonly _userService: UserService
    ) {
    }

    /**
     * Create a new auth session.
     *
     * @param sessionCreateDto
     */
    @HttpCode(HttpStatus.CREATED)
    @Post()
    async create(@Body() sessionCreateDto: SessionCreateDto) {
        const user = await this._userService.findByEmail(sessionCreateDto.email);

        if (!user) {
            throw new BadRequestException([
                "A user with the given e-mail address should exist",
            ], { cause: new Error(), description: 'Bad request' })
        }

        try {
            return this._authService.createSession(user, sessionCreateDto.password);
        } catch (error) {
            throw new BadRequestException([
                "Password should match the user's credentials",
            ], { cause: error, description: 'Bad request' })
        }
    }

    /**
     * Show details about the current auth session.
     *
     * @param request
     */
    @HttpCode(HttpStatus.OK)
    @Get("current")
    @UseGuards(AuthGuard)
    async showCurrent(@Req() request: Request) {
        if ('identity' in request) {
            return new AuthSessionDto(request.header('Authorization')!, request.identity as User);
        } else {
            throw new UnauthorizedException();
        }
    }
}
