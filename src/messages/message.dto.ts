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

export class GetMessagesBetweenUsersResultDto {
    @IsNotEmpty()
    @ApiProperty()
    id: number;

    @IsNotEmpty()
    @ApiProperty()
    timestamp: string; // In ISO format

    @IsNotEmpty()
    @ApiProperty()
    senderName: string;

    @IsNotEmpty()
    @ApiProperty()
    receiverName: string;

    @IsNotEmpty()
    @ApiProperty()
    textContent: string;
}
