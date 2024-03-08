import { HttpException, HttpStatus, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UsersService } from "../users/users.service";
import * as bcrypt from "bcrypt";
import { jwtConstants } from "./constants";

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) {}

    async logIn(username: string, password: string) {
        console.log(username);
        const hash = await this.usersService.getPassHashByName(username);
        if (hash == null) {
            throw new UnauthorizedException("No such user");
        }
        if (!(await bcrypt.compare(password, hash))) {
            throw new UnauthorizedException("Invalid password");
        }

        return { access_token: await this.jwtService.signAsync({ username }, { secret: jwtConstants.secret }) };
    }
}
