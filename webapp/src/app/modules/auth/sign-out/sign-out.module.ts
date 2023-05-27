import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { signOutRouting } from "src/app/modules/auth/sign-out/sign-out.routing";
import { SignOutComponent } from "src/app/modules/auth/sign-out/sign-out.component";



@NgModule({
  declarations: [
    SignOutComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(signOutRouting),
    MatProgressSpinnerModule,
    MatSnackBarModule,
  ]
})
export class SignOutModule { }
