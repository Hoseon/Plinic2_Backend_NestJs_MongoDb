import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class ScUserPushTokenDto {
    @ApiProperty({
        example: 'kakao:12345',
        description : 'uid로 정보 저장'
    })
    @IsString()
    readonly uid: string;
    @ApiProperty({
        example: 'asdf8asdfads8asdf67asdfjasdf',
        description : '사용자 고유 토큰 정보'
    })
    @IsString()
    readonly token: string;
}