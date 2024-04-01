import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Friendship } from "src/users/friendship.entity";
import { User } from "src/users/user.entity";
import { Message } from "./message.entity";
import { MessagesController } from "./messages.controller";
import { MessagesService } from "./messages.service";

@Module({
    imports: [TypeOrmModule.forFeature([Message, Friendship])],
    providers: [MessagesService],
    controllers: [MessagesController],
    exports: [MessagesService]
})
export class MessagesModule {}
