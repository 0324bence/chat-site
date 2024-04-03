import { Body, Controller, Get, Post, Query, Request, Sse, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOkResponse, ApiOperation } from "@nestjs/swagger";
import { fromEvent, interval, map, Observable } from "rxjs";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { SendTextMessageDto, GetMessagesBetweenUsersDto } from "./message.dto";
import { MessagesService } from "./messages.service";

@Controller("messages")
export class MessagesController {
    constructor(private readonly messagesService: MessagesService) {}

    @Post("sendTextMessage")
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: "Send a text message to a user", tags: ["messages"] })
    async sendTextMessage(@Body() body: SendTextMessageDto, @Request() req) {
        await this.messagesService.sendMessage(req.user.username, body.user, body.textContent);
    }

    @Get("getMessagesBetweenUsers")
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: "Get all messages sent between two users", tags: ["messages"] })
    async getMessagesFromUser(@Query() query: GetMessagesBetweenUsersDto, @Request() req) {
        return await this.messagesService.getMessagesBetweenUsers(query.user, req.user.username);
    }
}
