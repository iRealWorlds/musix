import { Component, Input } from '@angular/core';
import { Artist } from "src/app/modules/artist/artist.model";

@Component({
  selector: 'app-artist-card',
  templateUrl: './artist-card.component.html',
  styleUrls: ['./artist-card.component.scss']
})
export class ArtistCardComponent {
  @Input() artist?: Artist;
}
