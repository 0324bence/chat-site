import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Friendship {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    user1: string;

    @Column()
    user2: string;

    @Column({ default: false })
    accepted: boolean;
}
