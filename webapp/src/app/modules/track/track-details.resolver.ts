import { Injectable } from '@angular/core';
import { CrudDetailsResolver } from "src/app/core/crud/crud-details.resolver";
import { TrackService } from "src/app/modules/track/track.service";
import { Track } from "src/app/modules/track/track.model";

@Injectable()
export class TrackDetailsResolver extends CrudDetailsResolver<Track, TrackService> {
  protected override readonly routeKey = 'trackKey';

  constructor(service: TrackService) {
    super(service);
  }
}
