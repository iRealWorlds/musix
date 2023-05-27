import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ArtistListComponent } from './artist-list.component';
import { RouterModule } from "@angular/router";
import { artistListRouting } from "src/app/modules/artist/artist-list/artist-list.routing";
import { ArtistCardComponent } from './artist-card/artist-card.component';
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";



@NgModule({
  declarations: [
    ArtistListComponent,
    ArtistCardComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(artistListRouting),
    MatCardModule,
    NgOptimizedImage,
    MatIconModule,
    MatButtonModule
  ]
})
export class ArtistListModule { }
