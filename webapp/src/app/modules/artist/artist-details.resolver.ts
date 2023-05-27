import { Injectable } from '@angular/core';
import { CrudDetailsResolver } from "src/app/core/crud/crud-details.resolver";
import { Artist } from "src/app/modules/artist/artist.model";
import { ArtistService } from "src/app/modules/artist/artist.service";

@Injectable()
export class ArtistDetailsResolver extends CrudDetailsResolver<Artist, ArtistService> {
  protected override readonly routeKey = 'artistKey';

  constructor(service: ArtistService) {
    super(service);
  }
}
