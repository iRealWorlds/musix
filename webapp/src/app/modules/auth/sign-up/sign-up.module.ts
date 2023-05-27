import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { SignUpComponent } from './sign-up.component';
import {
    FieldValidationErrorsComponent
} from "src/app/modules/shared/field-validation-errors/field-validation-errors.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatInputModule } from "@angular/material/input";
import { RouterModule } from "@angular/router";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { signUpRouting } from "src/app/modules/auth/sign-up/sign-up.routing";



@NgModule({
  declarations: [
    SignUpComponent
  ],
    imports: [
        CommonModule,
        RouterModule.forChild(signUpRouting),
        ReactiveFormsModule,
        NgOptimizedImage,
        FieldValidationErrorsComponent,
        MatInputModule,
        MatCardModule,
        MatButtonModule,
        MatSnackBarModule,
    ]
})
export class SignUpModule { }
