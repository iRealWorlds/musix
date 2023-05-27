import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject, takeUntil } from "rxjs";
import { ArtistService } from "src/app/modules/artist/artist.service";
import { Artist } from "src/app/modules/artist/artist.model";

@Component({
  selector: 'app-artist-list',
  templateUrl: './artist-list.component.html',
  styleUrls: ['./artist-list.component.scss']
})
export class ArtistListComponent implements OnInit, OnDestroy {
  all$?: Observable<Artist[]|undefined>

  private readonly _unsubscribeAll = new Subject<void>();

  constructor(private readonly _artistService: ArtistService) {
  }

  /** @inheritDoc */
  ngOnInit() {
    this.all$ = this._artistService.all$.pipe(
        takeUntil(this._unsubscribeAll)
    );
  }

  /** @inheritDoc */
  ngOnDestroy() {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
}
