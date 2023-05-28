import { Injectable } from '@angular/core';
import { EnvironmentConfig } from "src/app/core/environment/environment.config.model";
import { HttpClient } from "@angular/common/http";
import { Track } from "src/app/modules/track/track.model";
import { TrackCreateRequest } from "src/app/modules/track/track-create.request";
import { CrudService } from "src/app/core/crud/crud.service";
import { TrackUpdateRequest } from "src/app/modules/track/track-update.request";
import { TrackIndexRequest } from "src/app/modules/track/track-index.request";

@Injectable({
  providedIn: 'root'
})
export class TrackService extends CrudService<Track, TrackCreateRequest, TrackUpdateRequest, TrackIndexRequest> {
  protected override endpoint: string;

  /**
   * Constructor method.
   *
   * @param environment
   * @param http
   */
  constructor(environment: EnvironmentConfig, http: HttpClient) {
    super(environment, http);
    this.endpoint = environment.api.endpoints.tracks;
  }
}
