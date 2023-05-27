import { Component, OnDestroy, OnInit } from '@angular/core';
import { filter, firstValueFrom, Observable, Subject, take, takeUntil, tap } from "rxjs";
import { Artist } from "src/app/modules/artist/artist.model";
import { ArtistService } from "src/app/modules/artist/artist.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ArtistUpdateRequest } from "src/app/modules/artist/artist-update.request";

@Component({
  selector: 'app-artist-details',
  templateUrl: './artist-details.component.html',
  styleUrls: ['./artist-details.component.scss']
})
export class ArtistDetailsComponent implements OnInit, OnDestroy {
  details$?: Observable<Artist|undefined>;

  artistForm = new FormGroup({
    name: new FormControl<string>('', { validators: [Validators.required], nonNullable: true }),
    description: new FormControl<string>('', { validators: [], nonNullable: true }),
  });

  deleting = false;

  private _loading = false;

  private readonly _unsubscribeAll = new Subject<void>();

  /**
   * ArtistDetailsComponent constructor method.
   *
   * @param _artistService
   * @param _snackBar
   * @param _router
   */
  constructor(
      private readonly _artistService: ArtistService,
      private readonly _snackBar: MatSnackBar,
      private readonly _router: Router
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

  /** @inheritDoc */
  ngOnInit() {
    this._artistService.details$.pipe(
        takeUntil(this._unsubscribeAll),
        filter(artist => !!artist),
        take(1),
        tap(artist => this.artistForm.patchValue({
          name: artist?.name,
          description: artist?.description
        }))
    ).subscribe();

    this.details$ = this._artistService.details$.pipe(
        takeUntil(this._unsubscribeAll),
    );
  }

  /** @inheritDoc */
  ngOnDestroy() {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  async deleteEntity() {
    if (this.loading || this.deleting) {
      throw new Error("Already processing a request");
    }

    if (!this.details$) {
      throw new Error("The details observable has not been set.");
    }

    const entity = await firstValueFrom(this.details$);

    if (!entity) {
      throw new Error("No entity loaded");
    }

    this.deleting = true;
    this._artistService.deleteByKey(entity.key).subscribe({
      next: async () => {
        this._snackBar.open("Artist deleted.", "Close");
        await this._router.navigate(['/artists']);
      },
      error: () => {
        this._snackBar.open("Could not delete artist.", "Close");
        this.deleting = false;
      }
    })
  }

  async updateEntity() {
    if (this.loading || this.deleting) {
      throw new Error("Already processing a request");
    }

    if (!this.details$) {
      throw new Error("The details observable has not been set.");
    }

    const entity = await firstValueFrom(this.details$);

    if (!entity) {
      throw new Error("No entity loaded");
    }

    this.artistForm.markAllAsTouched();

    if (this.artistForm.valid) {
      const request = new ArtistUpdateRequest(this.artistForm.value);

      this.loading = true;
      this._artistService.updateByKey(entity.key, request).subscribe({
        next: async artist => {
          this._snackBar.open("Artist updated successfully.", "Close");
          await this._router.navigate(['/artists/details', artist.key]);
          this.loading = false;
        },
        error: () => {
          this.loading = false;
          this._snackBar.open("Could not update artist.", "Close");
        }
      })
    }
  }
}
