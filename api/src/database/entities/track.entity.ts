import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Artist } from "@api/database/entities/artist.entity";

@Entity({
    name: 'tracks'
})
export class Track {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    publishedAt: Date = new Date();

    @Column()
    createdAt: Date = new Date();

    @ManyToOne(() => Artist, (artist) => artist.tracks)
    artist: Artist;
}