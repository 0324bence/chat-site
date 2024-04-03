import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class SendTextMessageDto {
    @IsNotEmpty()
    @ApiProperty()
    user: string;

    @IsNotEmpty()
    @ApiProperty()
    textContent: string;
}

export class GetMessagesBetweenUsersDto {
    @IsNotEmpty()
    @ApiProperty()
    user: string;
}
