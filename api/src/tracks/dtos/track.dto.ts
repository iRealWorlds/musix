import { Track } from "@api/database/entities/track.entity";
import { ArtistDto } from "@api/artists/dtos/artist.dto";

export class TrackDto {
    key: number;
    name: string;
    publishedAt: string;
    createdAt: string;
    artist: ArtistDto;

    constructor(track: Track) {
        this.key = track.id
        this.name = track.name;
        this.artist = new ArtistDto(track.artist);
        this.publishedAt = track.publishedAt.toISOString();
        this.createdAt = track.createdAt.toISOString();
    }
}