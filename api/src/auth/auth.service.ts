import { Injectable } from '@nestjs/common';
import { UserService } from "@api/user/user.service";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from 'bcrypt';
import { AuthSessionDto } from "@api/auth/dtos/auth-session.dto";
import { User } from "@api/user/user.entity";
import { ConfigService } from "@nestjs/config";
import { JwtPayloadDto } from "@api/auth/dtos/jwt-payload.dto";

@Injectable()
export class AuthService {
    /**
     * AuthService constructor method.
     *
     * @param _jwtService
     * @param _configService
     * @param _userService
     */
    constructor(
        private readonly _jwtService: JwtService,
        private readonly _configService: ConfigService,
        private readonly _userService: UserService
    ) {
    }

    /**
     * Try to create a new auth session with the given credentials.
     *
     * @param user
     * @param password
     */
    async createSession(user: User, password: string): Promise<AuthSessionDto> {
        if (!(await bcrypt.compare(password, user.passwordHash))) {
            throw new Error("Invalid credentials");
        }

        // Build the payload
        const payload = new JwtPayloadDto(user);

        // Create a signed token
        const token = await this._jwtService.signAsync({ ...payload });

        // Create a new AuthSession
        return new AuthSessionDto(token, user);
    }

    /**
     * Get the identity of the user that made a {@link request}.
     *
     * @param request
     * @private
     */
    async getIdentityFromRequest(request: Request): Promise<User|null> {
        const token = this._extractTokenFromHeader(request);
        console.debug("found token", token);

        // If no token was provided, the request is unauthorized.
        if (!token) {
            return null;
        }

        let payload: JwtPayloadDto;
        try {
            payload = await this._jwtService.verifyAsync<JwtPayloadDto>(token, {
                secret: this._configService.getOrThrow('JWT_SECRET'),
            });
        } catch (e) {
            return null;
        }

        if ('sub' in payload) {
            const userId = parseInt(payload.sub.toString());
            if (!isNaN(userId)) {
                const user = await this._userService.findByKey(userId);
                if (user !== null) {
                    return user;
                }
            }
        }

        return null;
    }

    /**
     * Extract the bearer token from a given {@link request}.
     *
     * @param request
     * @private
     */
    private _extractTokenFromHeader(request: Request): string | undefined {
        if ('authorization' in request.headers) {
            const header = request.headers.authorization;
            if (typeof header === 'string') {
                const [type, token] = header?.split(' ') ?? [];
                return type === 'Bearer' ? token : undefined;
            }
        }

        return undefined;
    }
}
