import { Injectable } from '@angular/core';
import { EnvironmentConfig } from "src/app/core/environment/environment.config.model";
import { HttpClient } from "@angular/common/http";
import { Artist } from "src/app/modules/artist/artist.model";
import { ArtistCreateRequest } from "src/app/modules/artist/artist-create.request";
import { CrudService } from "src/app/core/crud/crud.service";
import { ArtistUpdateRequest } from "src/app/modules/artist/artist-update.request";

@Injectable()
export class ArtistService extends CrudService<Artist, ArtistCreateRequest, ArtistUpdateRequest> {
  protected override endpoint: string;

  /**
   * Constructor method.
   *
   * @param environment
   * @param http
   */
  constructor(environment: EnvironmentConfig, http: HttpClient) {
    super(environment, http);
    this.endpoint = environment.api.endpoints.artists;
  }
}
