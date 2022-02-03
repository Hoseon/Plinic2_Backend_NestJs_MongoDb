import { ApiProperty } from "@nestjs/swagger"
import { IsString } from "class-validator"

export class LoginRecordDto { 
    @ApiProperty({example: 'E2msMFWNfRNS155TnSnrgmxYMDq2'})
    @IsString()
    readonly uid: string
}