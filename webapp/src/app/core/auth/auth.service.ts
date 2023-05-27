import { BehaviorSubject, catchError, map, Observable, of, tap, throwError } from "rxjs";
import { EventEmitter, Injectable } from "@angular/core";
import { ApiService } from "src/app/core/api/api.service";
import { TAuthToken } from "src/app/core/auth/auth-token.type";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { EnvironmentConfig } from "src/app/core/environment/environment.config.model";
import { AuthSessionCreateRequest } from "src/app/core/auth/auth-session-create.request";
import { AuthSession } from "src/app/core/auth/auth-session.model";
import { TCurrentIdentity } from "src/app/core/auth/current-identity.type";

@Injectable()
export class AuthService extends ApiService {
  /**
   * The name the auth token has in the local storage.
   */
  static TOKEN_STORAGE_NAME = 'auth_token';

  /**
   * Event that is triggered when the current auth token is changed.
   */
  tokenChanged = new EventEmitter<TAuthToken>();

  /**
   * A subject that hold the latest loaded identity user or undefined if none has been loaded.
   *
   * @private
   */
  private readonly _currentIdentity = new BehaviorSubject<TCurrentIdentity|undefined>(undefined);

  /**
   * AuthService constructor method.
   *
   * @param _http
   * @param environment
   */
  constructor(
      private readonly _http: HttpClient,
      protected override readonly environment: EnvironmentConfig,
  ) {
    super(environment);
  }

  /**
   * Get the latest loaded identity user or undefined if none has been loaded.
   */
  get currentIdentity$(): Observable<TCurrentIdentity|undefined> {
    return this._currentIdentity.asObservable();
  }

  /**
   * Get the currently active token.
   */
  get currentToken(): TAuthToken {
    return localStorage.getItem(AuthService.TOKEN_STORAGE_NAME);
  }

  /**
   * Set a new token as the currently active one.
   *
   * @param token
   */
  set currentToken(token: TAuthToken) {
    // Update the value in the local storage
    if (token === null) {
      localStorage.removeItem(AuthService.TOKEN_STORAGE_NAME);
    } else {
      localStorage.setItem(AuthService.TOKEN_STORAGE_NAME, token.toString());
    }

    // Emit the token changed event
    this.tokenChanged.emit(token);
  }

  /**
   * Create a new authentication session with the given {@link credentials}.
   *
   * @param credentials The credentials used for the session.
   * @param setActive Whether the new session should be the active one.
   */
  createSession(credentials: AuthSessionCreateRequest, setActive = true): Observable<AuthSession> {
    // Prepare a request
    let request = this._http.post<AuthSession>(this.buildApiEndpointUri([
      this.environment.api.endpoints.authSessions
    ]), credentials);

    // If the new session should be set as the active one, add this action to the pipeline
    if (setActive) {
      request = request.pipe(
          tap(session => {
            this.currentToken = session.token;
          }),
      );
    }

    // Return the request pipeline
    return request;
  }

  /**
   * Get the current identity data from the API.
   */
  getIdentity(): Observable<TCurrentIdentity> {
    // If there is no token, the current identity cannot be anything other than null
    if (!this.currentToken) {
      this._currentIdentity.next(null);
      return of(null);
    }

    // If there is a token, send a request to get the identity data
    return this._http.get<AuthSession>(this.buildApiEndpointUri([this.environment.api.endpoints.authSessions, 'current'])).pipe(
        // Catch 401 responses
        catchError(error => {
          if (error instanceof HttpErrorResponse) {
            if (error.status === 401) {
              this.clearSession();
              return of(null);
            }
          }
          return throwError(() => error);
        }),

        // Extract the identity
        map(session => session?.identity ?? null),

        // Update the subject
        tap(identity => {
          this._currentIdentity.next(identity);
        })
    );
  }

  /**
   * Clear the current session data.
   */
  clearSession(): Observable<void> {
    this.currentToken = null;
    return new Observable<void>(subscriber => {
      subscriber.next();
      subscriber.complete();
    });
  }

}
