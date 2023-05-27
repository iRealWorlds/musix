import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { SignInComponent } from './sign-in.component';
import { RouterModule } from "@angular/router";
import { signInRouting } from "src/app/modules/auth/sign-in/sign-in.routing";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { ReactiveFormsModule } from "@angular/forms";
import {
  FieldValidationErrorsComponent
} from "src/app/modules/shared/field-validation-errors/field-validation-errors.component";
import { MatCardModule } from "@angular/material/card";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";


@NgModule({
  declarations: [
    SignInComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(signInRouting),
    ReactiveFormsModule,
    FieldValidationErrorsComponent,

    // Angular material
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
    NgOptimizedImage,
  ]
})
export class SignInModule { }
