import {
    Controller,
    Get,
    HttpException,
    HttpStatus,
    Param,
    Post,
    Query,
    Body,
    UseGuards,
    Request,
    Header,
    UseInterceptors,
    UploadedFile
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { ApiBearerAuth, ApiHeader, ApiOkResponse, ApiOperation, ApiParam } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { AcceptOrDeclineFriendRequestDto, SendFriendRequestDto } from "./friend.dto";
import { UserCreateDto } from "./user-create.dto";
import { SearchUserDto, UserDto } from "./user.dto";
import { UsersService } from "./users.service";

@Controller("users")
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get()
    @ApiOperation({ summary: "List all users", tags: ["users"] })
    @ApiOkResponse({ type: UserDto, isArray: true })
    getUsers() {
        return this.usersService.getAll();
    }

    @Get("searchUsersByName")
    @ApiOperation({ summary: "Search users by beginning or part of their names", tags: ["users"] })
    @ApiOkResponse({ type: UserDto, isArray: true })
    async searchUsersByName(@Query() query: SearchUserDto) {
        return await this.usersService.searchUsersByName(
            query.value,
            (query.onlyBeginning ?? true).toString().toLowerCase() == "true"
        );
    }

    @Get("get/:id")
    @ApiOperation({ summary: "Get a user by id", tags: ["users"] })
    @ApiOkResponse({ type: UserDto })
    findUserById(@Param("id") id: number) {
        return this.usersService.getById(id);
    }

    @Post("add")
    @ApiOperation({ summary: "Add a new user", tags: ["users"] })
    async addUser(@Body() user: UserCreateDto) {
        return await this.usersService.add(user).catch(err => {
            throw new HttpException({ message: err.message }, HttpStatus.BAD_REQUEST);
        });
    }

    @Get("getOwnUserData")
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: "Get information about the logged in user", tags: ["users"] })
    @ApiOkResponse({ type: UserDto })
    getOwnUserData(@Request() req) {
        return this.usersService.getOwnUserData(req.user.username);
    }

    @Get("getOwnUsername")
    @UseGuards(JwtAuthGuard)
    @Header("Content-Type", "text/plain")
    @ApiBearerAuth()
    @ApiOperation({ summary: "Get the name of the logged in user", tags: ["users"] })
    @ApiOkResponse({ type: String })
    getOwnUsername(@Request() req) {
        return req["user"].username;
    }

    @Post("setPicture")
    @UseInterceptors(FileInterceptor("file"))
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({
        summary: "Set a user's profile picture.",
        tags: ["users"]
    })
    @ApiParam({ schema: { type: "file" }, name: "file" })
    async setPicture(@UploadedFile() file: Express.Multer.File, @Request() req) {
        await this.usersService.setUserPicture(req["user"].username, file);
    }

    @Post("sendFriendRequest")
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: "Send a friend request to a user", tags: ["users"] })
    async addFriend(@Body() body: SendFriendRequestDto, @Request() req) {
        await this.usersService.addFriendReq(req["user"].username, body.user);
    }

    @Post("acceptFriendRequest")
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: "Accept a friend request", tags: ["users"] })
    async acceptFriendReq(@Body() body: AcceptOrDeclineFriendRequestDto, @Request() req) {
        await this.usersService.acceptFriendReq(body.user, req["user"].username);
    }

    @Post("declineFriendRequest")
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: "Decline a friend request", tags: ["users"] })
    async declineFriendReq(@Body() body: AcceptOrDeclineFriendRequestDto, @Request() req) {
        await this.usersService.declineFriendReq(body.user, req["user"].username);
    }

    @Get("getIncomingFriendRequests")
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({
        summary: "Get the incoming friend requests",
        description: "Only not accepted friend requests are returned, because accepted requests represent friends.",
        tags: ["users"]
    })
    @ApiOkResponse({ type: UserDto, isArray: true, description: "Array of users" })
    async getIncomingFriendRequests(@Request() req) {
        return await this.usersService.getIncomingFriendRequests(req.user.username);
    }

    @Get("getSentFriendRequests")
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({
        summary: "Get the incoming friend requests",
        description: "Only not accepted friend requests are returned, because accepted requests represent friends.",
        tags: ["users"]
    })
    @ApiOkResponse({ type: UserDto, isArray: true, description: "Array of users" })
    async getSentFriendRequests(@Request() req) {
        return await this.usersService.getSentFriendRequests(req.user.username);
    }

    @Get("getFriends")
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({
        summary: "Get the list of friends",
        description: "Only accepted friend requests are returned.",
        tags: ["users"]
    })
    @ApiOkResponse({ type: UserDto, isArray: true, description: "Array of users" })
    async getFriends(@Request() req) {
        return await this.usersService.getFriends(req.user.username);
    }
}
