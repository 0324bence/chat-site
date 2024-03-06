import { IsNotEmpty } from "class-validator";

export class UserDto {
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    picture: string;

    @IsNotEmpty()
    password: string;
}
