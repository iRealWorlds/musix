import { Component, OnDestroy, OnInit } from '@angular/core';
import { filter, firstValueFrom, Observable, Subject, take, takeUntil, tap } from "rxjs";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { Track } from "src/app/modules/track/track.model";
import { TrackService } from "src/app/modules/track/track.service";
import { TrackUpdateRequest } from "src/app/modules/track/track-update.request";

@Component({
  selector: 'app-track-details',
  templateUrl: './track-details.component.html',
  styleUrls: ['./track-details.component.scss']
})
export class TrackDetailsComponent implements OnInit, OnDestroy {
  details$?: Observable<Track|undefined>;

  trackForm = new FormGroup({
    name: new FormControl<string>('', { validators: [Validators.required], nonNullable: true }),
    publishedAt: new FormControl<string>('', { validators: [Validators.required], nonNullable: true }),
  });

  deleting = false;

  private _loading = false;

  private readonly _unsubscribeAll = new Subject<void>();

  /**
   * TrackDetailsComponent constructor method.
   *
   * @param _trackService
   * @param _snackBar
   * @param _router
   */
  constructor(
    private readonly _trackService: TrackService,
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
      this.trackForm.disable();
    } else {
      this.trackForm.enable();
    }
  }

  /** @inheritDoc */
  ngOnInit() {
    this._trackService.details$.pipe(
      takeUntil(this._unsubscribeAll),
      filter(track => !!track),
      take(1),
      tap(track => this.trackForm.patchValue({
        name: track?.name,
        publishedAt: track?.publishedAt.split('T').shift()
      }))
    ).subscribe();

    this.details$ = this._trackService.details$.pipe(
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
    this._trackService.deleteByKey(entity.key).subscribe({
      next: async () => {
        this._snackBar.open("Track deleted.", "Close");
        await this._router.navigate(['/tracks']);
      },
      error: () => {
        this._snackBar.open("Could not delete track.", "Close");
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

    this.trackForm.markAllAsTouched();

    if (this.trackForm.valid) {
      const request = new TrackUpdateRequest(this.trackForm.value);

      this.loading = true;
      this._trackService.updateByKey(entity.key, request).subscribe({
        next: async track => {
          this._snackBar.open("Track updated successfully.", "Close");
          await this._router.navigate(['/tracks/details', track.key]);
          this.loading = false;
        },
        error: () => {
          this.loading = false;
          this._snackBar.open("Could not update track.", "Close");
        }
      })
    }
  }
}
