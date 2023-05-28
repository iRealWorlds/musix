import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { TrackDetailsComponent } from './track-details.component';
import { RouterModule } from "@angular/router";
import { trackDetailsRouting } from "src/app/modules/track/track-details/track-details.routing";
import {
  FieldValidationErrorsComponent
} from "src/app/modules/shared/field-validation-errors/field-validation-errors.component";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { ReactiveFormsModule } from "@angular/forms";
import { MatSnackBarModule } from "@angular/material/snack-bar";



@NgModule({
  declarations: [
    TrackDetailsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(trackDetailsRouting),
    FieldValidationErrorsComponent,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSnackBarModule,
    NgOptimizedImage,
    ReactiveFormsModule
  ]
})
export class TrackDetailsModule { }
