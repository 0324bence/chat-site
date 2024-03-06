import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UsersService } from "../users/users.service";

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService) {}

    async logIn(username: string, password: string) {
        const pass = await this.usersService.getPassByName(username);
        console.log(pass);
        console.log(password);
        if (pass == null) {
            throw new UnauthorizedException("No such user");
        }
        if (pass != password) {
            throw new UnauthorizedException("Invalid password");
        }

        return "OK";
    }
}
