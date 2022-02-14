import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsString } from "class-validator";

export class CreateUnregisterDto {
    @ApiProperty({ example: 'kakao:1756197542' })
    @IsString()
    readonly uid: string

    @ApiProperty({ example: 'jin8992@naver.com' })
    @IsString()
    readonly email: string

    @ApiProperty({ example: '01092402061' })
    @IsString()
    readonly phone: string

    @ApiProperty({ example: '19890902' })
    @IsString()
    readonly birth: string

    @ApiProperty({ example: '이요진' })
    @IsString()
    readonly name: string

    @ApiProperty({ example: '0' })
    @IsString()
    readonly foreigner: string

    @ApiProperty({ example: 'LGT' })
    @IsString()
    readonly carrier: string

    @ApiProperty({ example: 0 })
    @IsString()
    readonly gender: number

    @ApiProperty({ example: 0 , description: '신청일로 부터 + 14일'})
    @IsDate()
    unRegisterAt;
}
