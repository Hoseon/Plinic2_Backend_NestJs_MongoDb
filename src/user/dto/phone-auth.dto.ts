import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class PhoneAuthDto {
@ApiProperty({ example: 'kakao:12345' })
@IsString()    
uid: string
    
@ApiProperty({ example: 'chs1234@gmail.com' })
@IsString()
email: string
    
@ApiProperty({ example: '01012345678' })
@IsString()
phone: string
    
@ApiProperty({ example: '19841025' })
@IsString()
birth: string
    
@ApiProperty({ example: '홍길동' })
@IsString()
name: string
    
@ApiProperty({ example: '0', description: '0은 내국인 0이 아니면 외국인' })
@IsString()
foreigner: string
    
@ApiProperty({ example: 'KT'})
@IsString()
carrier: string
    
@ApiProperty({ example: 0, description: '0이면 남자 0이 아니면 여자' })
@IsNumber()
gender: number
}