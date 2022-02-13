import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNumber, IsString } from "class-validator";

export class AddressDto { 
    @ApiProperty({ example: 'kakao:12345' })
    @IsString()
    readonly uid: string

    @ApiProperty({ example: 'chs1025@gmail.com' })
    @IsString()
    readonly email: string

    @ApiProperty({ example: '추호선', description: '받는사람' })
    @IsString()
    toName: string

    @ApiProperty({ example: '21957', description: '우편번호' })
    @IsNumber()
    postNumber: number

    @ApiProperty({ example: '인천광역시 연수구 능허대로 79번길' , description: '도로명 주소 대표'})
    @IsString()
    address1: string

    @ApiProperty({ example: '송도 럭키 아파트 XXX동 XXXX호' , description: '도로명 상세주소'})
    @IsString()
    address2: string

    @ApiProperty({ example: '010-1234-1234' , description: '받을 사람 전화번호'})
    @IsString()
    phone: string

    @ApiProperty({ example: true , description: '받을 사람 전화번호'})
    @IsBoolean()
    isDefault: boolean


}