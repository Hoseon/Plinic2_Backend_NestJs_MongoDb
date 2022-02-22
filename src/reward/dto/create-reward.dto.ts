import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";
import { isValidObjectId } from "mongoose";

export class CreateRewardDto {
    @ApiProperty({ example: 'kakao:1754055337' })
    @IsString()
    readonly uid: string;

    @ApiProperty({ example: 'chs1025@gmail.com' })
    @IsString()
    readonly email: string;

    @ApiProperty({ example: '추호선' })
    @IsString()
    toName: string;

    @ApiProperty({ example: '010-1234-1234' })
    @IsString()
    phone: string;

    @ApiProperty({ example: '인천광역시 연수구 능허대로79번길 30' })
    @IsString()
    address1: string

    @ApiProperty({ example: '럭키송도아파트' })
    @IsString()
    address2: string

    @ApiProperty({ example: '21957' })
    @IsString()
    postNumber: string

    @ApiProperty({ example: '부재시 경비실에' })
    @IsString()
    deliverMsg: string

    @ApiProperty({ example: '스타벅스 상품권' })
    @IsString()
    productName: string

    @ApiProperty({ example: '6212ea4189341bf981a8b11c' })
    challengeId

}
