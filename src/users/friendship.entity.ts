import { IsNotEmpty } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn, ManyToOne, Unique } from "typeorm";
import { User } from "./user.entity";

@Entity()
@Unique(["user1", "user2"])
export class Friendship {
    @PrimaryGeneratedColumn()
    id: number;

    @IsNotEmpty()
    @ManyToOne(() => User, { nullable: false })
    @JoinColumn({ referencedColumnName: "name", name: "user1" })
    user1: string;

    @IsNotEmpty()
    @ManyToOne(() => User, { nullable: false })
    @JoinColumn({ referencedColumnName: "name", name: "user2" })
    user2: string;

    @Column({ default: false })
    accepted: boolean;
}