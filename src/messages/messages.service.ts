import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Friendship } from "../users/friendship.entity";
import { Repository } from "typeorm";
import { Message } from "./message.entity";
import { UsersService } from "src/users/users.service";

@Injectable()
export class MessagesService {
    constructor(
        @InjectRepository(Message)
        private messagesRepository: Repository<Message>,
        @InjectRepository(Friendship)
        private friendshipsRepository: Repository<Friendship>,
        private usersService: UsersService
    ) {}

    async sendMessage(sender: string, receiver: string, textContent: string) {
        let msg = {
            timestamp: new Date().toISOString(),
            senderName: sender,
            receiverName: receiver,
            textContent: textContent.trim()
        };
        if (Object.values(msg).findIndex(x => x == undefined) != -1) {
            throw new BadRequestException("Missing argument");
        }

        if (msg.textContent.length == 0) {
            throw new BadRequestException("Message is empty");
        }

        if (!(await this.usersService.areFriends(sender, receiver))) {
            throw new BadRequestException("Users are not friends");
        }

        try {
            await this.messagesRepository.insert(msg);
        } catch (e) {
            if (e.code == "ER_NO_REFERENCED_ROW_2") {
                throw new BadRequestException("No such user");
            }
            throw new BadRequestException(e.sqlMessage);
        }
    }

    async getMessagesBetweenUsers(user1: string, user2: string) {
        return this.messagesRepository.find({
            where: [
                { senderName: user1, receiverName: user2 },
                { senderName: user2, receiverName: user1 }
            ],
            order: {
                timestamp: "ASC"
            }
        });
    }
}
