import { Module } from "@nestjs/common";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Friendship } from "src/users/friendship.entity";
import { User } from "src/users/user.entity";
import { UsersModule } from "src/users/users.module";
import { UsersService } from "src/users/users.service";
import { Message } from "./message.entity";
import { MessagesController } from "./messages.controller";
import { MessagesService } from "./messages.service";

@Module({
    imports: [TypeOrmModule.forFeature([Message, Friendship, User]), UsersModule, EventEmitter2],
    providers: [MessagesService, UsersService, EventEmitter2],
    controllers: [MessagesController],
    exports: [MessagesService]
})
export class MessagesModule {}
