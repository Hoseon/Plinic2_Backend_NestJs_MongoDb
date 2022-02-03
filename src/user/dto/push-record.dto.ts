import { ApiProperty } from "@nestjs/swagger"
import { IsDate, IsString } from "class-validator"
import { Date } from "mongoose"

export class PushRecordDto { 
    @ApiProperty({example: 'E2msMFWNfRNS155TnSnrgmxYMDq2aksjdhfkjhasdfuiqyuwer'})
    @IsString()
    token: string
    @ApiProperty({example: 'E2msMFWNfRNS155'})
    @IsString()
    readonly uid: string
    @IsDate()
    timeTest: Date
    @IsDate()
    updatedAt: Date
    
}