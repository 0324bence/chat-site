import { Controller, Get, HttpException, HttpStatus, Param, Post, Query } from "@nestjs/common";
import { UserDto } from "./user.dto";
import { UsersService } from "./users.service";

@Controller("users")
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get()
    getUsers() {
        return this.usersService.getAll();
    }

    @Get("get/:id")
    findUserById(@Param("id") id: number) {
        console.log(id);
        return this.usersService.getById(id);
    }

    @Post("add?")
    async addUser(@Query() user: UserDto) {
        return await this.usersService.add(user).catch(err => {
            throw new HttpException({ message: err.message }, HttpStatus.BAD_REQUEST);
        });
    }
}
