import { Body, Controller, Get, Post, Request, UseGuards } from "@nestjs/common";
import { ApiOperation } from "@nestjs/swagger";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { SendTextMessageDto } from "./message.dto";
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
}
