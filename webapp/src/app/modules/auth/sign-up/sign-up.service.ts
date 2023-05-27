import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { concatMap, map, Observable } from 'rxjs';
import { ApiService } from "src/app/core/api/api.service";
import { EnvironmentConfig } from "src/app/core/environment/environment.config.model";
import { AuthService } from "src/app/core/auth/auth.service";
import { SignUpRequest } from "src/app/modules/auth/sign-up/sign-up.request";
import { UserDetails } from "src/app/modules/auth/sign-up/user-details.model";
import { AuthSessionCreateRequest } from "src/app/core/auth/auth-session-create.request";

@Injectable({
  providedIn: 'root'
})
export class SignUpService extends ApiService {
  /**
   * SignUpService constructor method.
   *
   * @param environment
   * @param _http
   * @param _authService
   */
  constructor(
      protected override readonly environment: EnvironmentConfig,
      private readonly _http: HttpClient,
      private readonly _authService: AuthService,
  ) {
    super(environment);
  }

  /**
   * Send a request to create a new user with the given {@link data} and then sign in.
   * @param data
   */
  createAccount(data: SignUpRequest): Observable<UserDetails> {
    return this._http.post<UserDetails>(this.buildApiEndpointUri(this.environment.api.endpoints.users), data).pipe(
        // After signing up, send a request ot create a new auth session as well
        concatMap(response => this._authService.createSession(new AuthSessionCreateRequest({
          email: data.email,
          password: data.password
        })).pipe(map(() => response)))
    );
  }
}
