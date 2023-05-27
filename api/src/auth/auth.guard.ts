import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from "@api/auth/auth.service";

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
      private readonly _authService: AuthService,
  ) {
  }

  /** @inheritDoc */
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const identity = await this._authService.getIdentityFromRequest(request);

    if (identity === null) {
      throw new UnauthorizedException();
    }

    request.identity = identity;

    return true;
  }
}
