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

export class SetUserPictureDto {
    @IsNotEmpty()
    @ApiProperty()
    picture: string;
}
