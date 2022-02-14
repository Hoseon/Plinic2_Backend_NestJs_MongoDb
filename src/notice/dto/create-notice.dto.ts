import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateNoticeDto {
    @ApiProperty({ example: '배송 지연 안내' })
    @IsString()
    title: string

    @ApiProperty({ example: '공지사항 내용이 들어 감 \n 공지사항 내용 들어감' })
    @IsString()
    content: string
}
