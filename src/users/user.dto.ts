import { ApiProperty, ApiQuery } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

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
