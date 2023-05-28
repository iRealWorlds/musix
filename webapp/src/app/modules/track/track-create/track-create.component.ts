import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { TrackService } from "src/app/modules/track/track.service";
import { TrackCreateRequest } from "src/app/modules/track/track-create.request";
import { Artist } from "src/app/modules/artist/artist.model";
import { ArtistService } from "src/app/modules/artist/artist.service";
import { ArtistIndexRequest } from "src/app/modules/artist/artist-index.request";
import { Observable } from "rxjs";

@Component({
  selector: 'app-track-create',
  templateUrl: './track-create.component.html',
  styleUrls: ['./track-create.component.scss']
})
export class TrackCreateComponent {
  trackForm = new FormGroup({
    name: new FormControl<string>('', { validators: [Validators.required], nonNullable: true }),
    artist: new FormControl<Artist|null>(null, { validators: [Validators.required], nonNullable: true }),
    publishedAt: new FormControl<string>('', { validators: [Validators.required], nonNullable: true }),
  });

  private _loading = false;

  /**
   * TrackCreateComponent constructor method.
   *
   * @param _trackService
   * @param _artistService
   * @param _snackBar
   * @param _router
   */
  constructor(
    private readonly _trackService: TrackService,
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
      this.trackForm.disable();
    } else {
      this.trackForm.enable();
    }
  }

  /**
   * Submit the creation form.
   */
  submitForm() {
    if (this.loading) {
      throw new Error("Already loading");
    }

    this.trackForm.markAllAsTouched();

    if (this.trackForm.valid) {
      const request = new TrackCreateRequest({
        name: this.trackForm.value.name,
        publishedAt: this.trackForm.value.publishedAt,
        artistKey: this.trackForm.value.artist!.key
      });

      this.loading = true;
      this._trackService.create(request).subscribe({
        next: async track => {
          this._snackBar.open("Track created successfully.", "Close");
          await this._router.navigate(['/tracks/details', track.key]);
        },
        error: () => {
          this.loading = false;
          this._snackBar.open("Could not create track.", "Close");
        }
      })
    }
  }

  /**
   * Search by the given {@link query}.
   *
   * @param query
   */
  searchArtists(query: string): Observable<Artist[]> {
    return this._artistService.getAll(new ArtistIndexRequest({
      query
    }));
  }

  /**
   * Format the given {@link artist} to be displayed as a suggestion.
   */
  formatArtistSuggestion(artist: Artist): string {
    return artist.name;
  }
}
