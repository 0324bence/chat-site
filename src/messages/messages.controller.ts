import { Body, Controller, Get, Post, Request, UseGuards } from "@nestjs/common";
import { ApiOkResponse, ApiOperation } from "@nestjs/swagger";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { SendTextMessageDto, GetMessagesBetweenUsersDto } from "./message.dto";
import { MessagesService } from "./messages.service";

@Controller("messages")
export class MessagesController {
    constructor(private readonly messagesService: MessagesService) {}

    @Post("sendTextMessage")
    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: "Send a text message to a user", tags: ["messages"] })
    async sendTextMessage(@Body() body: SendTextMessageDto, @Request() req) {
        await this.messagesService.sendMessage(req.user.username, body.user, body.textContent);
    }

    @Get("getMessagesBetweenUsers")
    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: "Get all messages sent between two users", tags: ["messages"] })
    async getMessagesFromUser(@Body() body: GetMessagesBetweenUsersDto, @Request() req) {
        return await this.messagesService.getMessagesBetweenUsers(body.user, req.user.username);
    }
}
