import { Artist } from "src/app/modules/artist/artist.model";

export interface Track {
  key: number;
  name: string;
  artist: Artist;
  publishedAt: string;
  createdAt: string;
}
