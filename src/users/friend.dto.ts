import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class SendFriendRequestDto {
    @IsNotEmpty()
    @ApiProperty()
    user: string;
}

export class AcceptOrDeclineFriendRequestDto {
    @IsNotEmpty()
    @ApiProperty()
    user: string;
}
