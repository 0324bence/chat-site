import { Controller, Get, HttpException, HttpStatus, Param, Post, Query } from "@nestjs/common";
import { ApiOkResponse, ApiOperation } from "@nestjs/swagger";
import { UserDto } from "./user.dto";
import { User } from "./user.entity";
import { UsersService } from "./users.service";

@Controller("users")
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get()
    @ApiOperation({ summary: "List all users" })
    @ApiOkResponse({ type: UserDto, isArray: true })
    getUsers() {
        return this.usersService.getAll();
    }

    @Get("get/:id")
    @ApiOperation({ summary: "Get a user by id" })
    @ApiOkResponse({ type: UserDto })
    findUserById(@Param("id") id: number) {
        return this.usersService.getById(id);
    }

    @Post("add")
    @ApiOperation({ summary: "Add a new user" })
    async addUser(@Query() user: UserDto) {
        return await this.usersService.add(user).catch(err => {
            throw new HttpException({ message: err.message }, HttpStatus.BAD_REQUEST);
        });
    }
}
