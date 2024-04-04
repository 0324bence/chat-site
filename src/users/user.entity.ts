import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from "typeorm";
import { Friendship } from "./friendship.entity";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    name: string;

    @Column({ default: null, nullable: true, type: "longtext" })
    picture: string;

    @Column({ select: false })
    passwordHash: string;
}
