import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArtistIndexResolver } from "src/app/modules/artist/artist-index.resolver";
import { ArtistDetailsResolver } from "src/app/modules/artist/artist-details.resolver";
import { RouterModule } from "@angular/router";
import { artistRouting } from "src/app/modules/artist/artist.routing";



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(artistRouting)
  ],
  providers: [
    ArtistIndexResolver,
    ArtistDetailsResolver,
  ]
})
export class ArtistModule { }
