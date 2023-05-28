import { Injectable } from '@angular/core';
import { CrudIndexResolver } from "src/app/core/crud/crud-index.resolver";
import { Track } from "src/app/modules/track/track.model";
import { TrackService } from "src/app/modules/track/track.service";

@Injectable()
export class TrackIndexResolver extends CrudIndexResolver<Track, TrackService> {
  constructor(service: TrackService) {
    super(service);
  }
}
