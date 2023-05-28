import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";
import { trackCreateRouting } from "src/app/modules/track/track-create/track-create.routing";
import { TrackCreateComponent } from "src/app/modules/track/track-create/track-create.component";
import {
  FieldValidationErrorsComponent
} from "src/app/modules/shared/field-validation-errors/field-validation-errors.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import {
  SearchableModelInputComponent
} from "src/app/modules/shared/searchable-model-input/searchable-model-input.component";



@NgModule({
  declarations: [
    TrackCreateComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(trackCreateRouting),
    FieldValidationErrorsComponent,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSnackBarModule,
    ReactiveFormsModule,
    SearchableModelInputComponent
  ]
})
export class TrackCreateModule { }
