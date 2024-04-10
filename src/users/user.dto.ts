import { ApiProperty, ApiQuery } from "@nestjs/swagger";
import { IsNotEmpty, isNotEmpty } from "class-validator";

export class UserDto {
    @IsNotEmpty()
    @ApiProperty()
    id: number;

    @IsNotEmpty()
    @ApiProperty()
    name: string;

    @IsNotEmpty()
    @ApiProperty({ nullable: true })
    picture: string;
}

export class SearchUserDto {
    @IsNotEmpty()
    @ApiProperty()
    value: string;

    @ApiProperty({
        default: true,
        description:
            "If true, search only usernames that begin with the value. If false, search usernames containing the value."
    })
    onlyBeginning: boolean;
}
