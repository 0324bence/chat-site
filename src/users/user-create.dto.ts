import { ApiProperty, ApiQuery } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { UserDto } from "./user.dto";

export class UserCreateDto {
    @IsNotEmpty()
    @ApiProperty()
    name: string;

    @IsNotEmpty()
    @ApiProperty()
    password: string;
}
