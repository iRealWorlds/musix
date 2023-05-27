import { Injectable } from '@angular/core';
import { Artist } from "src/app/modules/artist/artist.model";
import { ArtistService } from "src/app/modules/artist/artist.service";
import { CrudIndexResolver } from "src/app/core/crud/crud-index.resolver";

@Injectable()
export class ArtistIndexResolver extends CrudIndexResolver<Artist, ArtistService> {
  constructor(service: ArtistService) {
    super(service);
  }
}
