import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArtistCreateComponent } from './artist-create.component';
import { MatCardModule } from "@angular/material/card";
import { RouterModule } from "@angular/router";
import { artistCreateRouting } from "src/app/modules/artist/artist-create/artist-create.routing";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import {
    FieldValidationErrorsComponent
} from "src/app/modules/shared/field-validation-errors/field-validation-errors.component";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";



@NgModule({
    declarations: [
        ArtistCreateComponent
    ],
    imports: [
        CommonModule,
        MatCardModule,
        MatSnackBarModule,
        RouterModule.forChild(artistCreateRouting),
        FieldValidationErrorsComponent,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatIconModule,
    ]
})
export class ArtistCreateModule { }
