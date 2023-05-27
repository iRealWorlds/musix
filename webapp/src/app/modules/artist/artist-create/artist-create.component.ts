import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ArtistService } from "src/app/modules/artist/artist.service";
import { ArtistCreateRequest } from "src/app/modules/artist/artist-create.request";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";

@Component({
  selector: 'app-artist-create',
  templateUrl: './artist-create.component.html',
  styleUrls: ['./artist-create.component.scss']
})
export class ArtistCreateComponent {
  artistForm = new FormGroup({
    name: new FormControl<string>('', { validators: [Validators.required], nonNullable: true }),
    description: new FormControl<string>('', { validators: [], nonNullable: true }),
  });

  private _loading = false;

  /**
   * ArtistCreateComponent constructor method.
   *
   * @param _artistService
   * @param _snackBar
   * @param _router
   */
  constructor(
      private readonly _artistService: ArtistService,
      private readonly _snackBar: MatSnackBar,
      private readonly _router: Router,
  ) {
  }

  /**
   * Get the current loading state.
   */
  get loading() {
    return this._loading;
  }

  /**
   * Set a new loading state.
   *
   * @param value
   */
  set loading(value: boolean) {
    this._loading = value;

    if (value) {
      this.artistForm.disable();
    } else {
      this.artistForm.enable();
    }
  }

  /**
   * Submit the artist creation form.
   */
  submitForm() {
    if (this.loading) {
      throw new Error("Already loading");
    }

    this.artistForm.markAllAsTouched();

    if (this.artistForm.valid) {
      const request = new ArtistCreateRequest(this.artistForm.value);

      this.loading = true;
      this._artistService.create(request).subscribe({
        next: async artist => {
          this._snackBar.open("Artist created successfully.", "Close");
          await this._router.navigate(['/artists/details', artist.key]);
        },
        error: () => {
          this.loading = false;
          this._snackBar.open("Could not create artist.", "Close");
        }
      })
    }
  }
}
