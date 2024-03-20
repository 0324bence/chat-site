import { IsNotEmpty } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn, ManyToOne } from "typeorm";
import { User } from "./user.entity";

@Entity()
export class Friendship {
    @PrimaryGeneratedColumn()
    id: number;

    @IsNotEmpty()
    @ManyToOne(() => User, { nullable: false })
    @JoinColumn({ referencedColumnName: "name" })
    user1: string;

    @IsNotEmpty()
    @ManyToOne(() => User, { nullable: false })
    @JoinColumn({ referencedColumnName: "name" })
    user2: string;

    @Column({ default: false })
    accepted: boolean;
}
