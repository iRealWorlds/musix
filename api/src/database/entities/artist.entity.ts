import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "src/database/entities/user.entity";
import { Track } from "@api/database/entities/track.entity";

@Entity({
    name: 'artists'
})
export class Artist {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description?: string = undefined;

    @Column()
    createdAt: Date = new Date();

    @ManyToOne(() => User, (user) => user.artists)
    user: User

    @OneToMany(() => Track, track => track.artist, { eager: true })
    tracks: Track[]
}