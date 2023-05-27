import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "src/database/entities/user.entity";

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
}