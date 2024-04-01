import { isNotEmpty, IsNotEmpty } from "class-validator";
import { User } from "src/users/user.entity";
import internal from "stream";
import { Column, Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn, ManyToOne, Unique } from "typeorm";

@Entity()
export class Message {
    @PrimaryGeneratedColumn()
    id: number;

    @IsNotEmpty()
    @Column()
    timestamp: string; // In ISO format

    @IsNotEmpty()
    @Column()
    senderName: string;

    @IsNotEmpty()
    @ManyToOne(() => User, { nullable: false })
    @JoinColumn({ referencedColumnName: "name" })
    sender: string;

    @IsNotEmpty()
    @Column()
    receiverName: string;

    @IsNotEmpty()
    @ManyToOne(() => User, { nullable: false })
    @JoinColumn({ referencedColumnName: "name" })
    receiver: string;

    @IsNotEmpty()
    @Column()
    textContent: string;
}
