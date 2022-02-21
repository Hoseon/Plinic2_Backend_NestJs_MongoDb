import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsString } from "class-validator";

export class CreateDevicelogDto {
    @ApiProperty({ example: 'kakao:1754055337' })
    @IsString()
    uid: string;

    @ApiProperty({ example: 'chs1025@gmail.com' })
    @IsString()
    email: string;

    @ApiProperty({ example: '챌린지보상' })
    @IsString()
    from: string;

    @ApiProperty({ examples: ['50', 'test' ] })
    @IsArray()
    log: [{
            time: number,
            createdTime: Date, 
    }];
    
}
