import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({
    name: 'users'
})
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        unique: true
    })
    emailAddress: string;

    @Column()
    passwordHash: string;

    @Column()
    firstName: string;

    @Column()
    lastName: string;
}