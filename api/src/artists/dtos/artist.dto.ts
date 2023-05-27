import { Artist } from "@api/database/entities/artist.entity";

export class ArtistDto {
    key: number;
    name: string;
    description?: string;
    createdAt: string;

    constructor(artist: Artist) {
        this.key = artist.id
        this.name = artist.name;
        this.description = artist.description;
        this.createdAt = artist.createdAt.toISOString();
    }
}