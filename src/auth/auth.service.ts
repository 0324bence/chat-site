import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UsersService } from "../users/users.service";

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) {}

    async logIn(username: string, password: string) {
        const pass = await this.usersService.getPassByName(username);
        if (pass == null) {
            throw new UnauthorizedException("No such user");
        }
        if (pass != password) {
            throw new UnauthorizedException("Invalid password");
        }

        return { access_token: await this.jwtService.signAsync({ username }) };
    }
}
