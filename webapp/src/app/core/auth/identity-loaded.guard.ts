import { inject } from '@angular/core';
import {
  CanActivateChildFn,
  CanActivateFn,
} from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { AuthService } from "src/app/core/auth/auth.service";

/**
 * Make sure that a request has been sent to the API to check the current identity.
 */
export const identityLoadedGuard: CanActivateFn|CanActivateChildFn = async (): Promise<boolean> => {
  const authService = inject(AuthService);
  const currentIdentity = await firstValueFrom(authService.currentIdentity$);

  if (currentIdentity === undefined) {
    try {
      await firstValueFrom(authService.getIdentity());
    } catch (error) {
      return false;
    }
  }

  return true;
};
