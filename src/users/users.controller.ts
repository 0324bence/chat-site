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
    Request
} from "@nestjs/common";
import { ApiBearerAuth, ApiOkResponse, ApiOperation } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { UserCreateDto } from "./user-create.dto";
import { SetUserPictureDto, UserDto } from "./user.dto";
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

    @Post("setPicture")
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: "Set a user's profile picture", tags: ["users"] })
    setPicture(@Body() picture: SetUserPictureDto, @Request() req) {
        this.usersService.setUserPicture(req["user"].username, picture.picture);
    }

    @Post("sendFriendRequest")
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: "Send a friend request to a user", tags: ["users"] })
    addFriend(@Query("user") another: string, @Request() req) {
        this.usersService.addFriendReq(req["user"].username, another);
    }
}
