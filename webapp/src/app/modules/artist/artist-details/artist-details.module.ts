import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ArtistDetailsComponent } from './artist-details.component';
import { RouterModule } from "@angular/router";
import { artistDetailsRouting } from "src/app/modules/artist/artist-details/artist-details.routing";
import { MatCardModule } from "@angular/material/card";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { ReactiveFormsModule } from "@angular/forms";
import {
  FieldValidationErrorsComponent
} from "src/app/modules/shared/field-validation-errors/field-validation-errors.component";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";



@NgModule({
  declarations: [
    ArtistDetailsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(artistDetailsRouting),
    MatCardModule,
    MatSnackBarModule,
    NgOptimizedImage,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
    FieldValidationErrorsComponent,
    MatFormFieldModule,
    MatInputModule
  ]
})
export class ArtistDetailsModule { }
