import { ApiProperty } from "@nestjs/swagger"
import { IsString } from "class-validator"

export class CreateRegisterDto {
    @ApiProperty({
        example: 'kakao:12345',
        description : 'kakao와 google 두개로 나뉘어짐'
    })
    @IsString()
    readonly uid: string
    @ApiProperty({example: 'chs1025@gmail.com'})
    @IsString()
    readonly email: string
    @ApiProperty({example: '홍길동'})
    @IsString()
    readonly name: string
    @ApiProperty({example: '닉네임'})
    @IsString()
    readonly nickname: string
    @ApiProperty({example: '카카오', description: '카카오 or 구글'})
    @IsString()
    readonly from: string
    @ApiProperty({example: '남성', description: '남성 or 여성'})
    @IsString()
    readonly gender: string
    @ApiProperty({example: '1984-10-25'})
    @IsString()
    readonly birthDay: string
    @ApiProperty({ example: 'https://lh3.googleusercontent.com/a-/AOh14GhZ5cWXmGC0XT9iN2ZMSTMJ0DnMZnoEFfr4ziaz=s96-c', description: 'SNS정보에서 취득한 이미지' })
    @IsString()
    readonly avata_url: string
}
