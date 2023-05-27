import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { filter, mergeWith, take } from 'rxjs';
import { AuthService } from "src/app/core/auth/auth.service";
import { AuthSessionCreateRequest } from "src/app/core/auth/auth-session-create.request";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
})
export class SignInComponent {
  signInForm = new FormGroup({
    emailAddress: new FormControl<string>('', { validators: [Validators.required, Validators.email], nonNullable: true}),
    password: new FormControl<string>('', { validators: [Validators.required], nonNullable: true})
  });

  private _loading = false;

  /**
   * SignInComponent constructor method.
   *
   * @param _authService
   * @param _toastService
   * @param _router
   */
  constructor(
      private readonly _authService: AuthService,
      private readonly _toastService: MatSnackBar,
      private readonly _router: Router,
  ) {
  }

  /**
   * Get the current loading state for this component.
   */
  get loading(): boolean {
    return this._loading;
  }

  /**
   * Set a new loading state for this component.
   *
   * @param value
   */
  set loading(value: boolean) {
    this._loading = value;

    if (value) {
      this.signInForm.disable();
    } else {
      this.signInForm.enable();
    }
  }

  /**
   * Submit the sign in request.
   */
  signIn(): void {
    // If already loading, throw an exception
    if (this.loading) {
      throw new Error('A sign in request is already pending.');
    }

    // Mark the form as having been touched so that validation errors are displayed
    this.signInForm.markAllAsTouched();

    // If the form is valid, build and send a request
    if (this.signInForm.valid) {
      // Build the request
      const data = new AuthSessionCreateRequest({
        email: this.signInForm.controls.emailAddress.value,
        password: this.signInForm.controls.password.value,
      });

      // Send the request
      this.loading = true;
      this._authService.createSession(data).pipe(
          mergeWith(
              this._authService.currentIdentity$.pipe(
                  filter(identity => !!identity),
                  take(1)
              ),
          )
      ).subscribe({
        error: (response: HttpErrorResponse) => {
          this.loading = false;

          this._toastService.open('An error has occurred. Please try again!', 'Close');
        },
        complete: async () => {
          this._toastService.open('You have signed in successfully.', 'Close');
          await this._router.navigate(['']);
          this.loading = false;
        }
      });
    }
  }
}
