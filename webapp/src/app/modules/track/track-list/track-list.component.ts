import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject, takeUntil } from "rxjs";
import { Track } from "src/app/modules/track/track.model";
import { TrackService } from "src/app/modules/track/track.service";

@Component({
  selector: 'app-track-list',
  templateUrl: './track-list.component.html',
  styleUrls: ['./track-list.component.scss']
})
export class TrackListComponent implements OnInit, OnDestroy {
  all$?: Observable<Track[]|undefined>

  displayedColumns: string[] = ['position', 'name', 'publishedAt', 'createdAt'];

  private readonly _unsubscribeAll = new Subject<void>();

  constructor(private readonly _trackService: TrackService) {
  }

  /** @inheritDoc */
  ngOnInit() {
    this.all$ = this._trackService.all$.pipe(
      takeUntil(this._unsubscribeAll)
    );
  }

  /** @inheritDoc */
  ngOnDestroy() {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
}
