import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, isBoolean, IsString } from "class-validator";

export class ScUserAgreeDto {
    @IsString()
    uid: string
    @IsBoolean()
    agree1: boolean
    @IsBoolean()
    agree2: boolean
    @IsBoolean()
    agree3: boolean
    @IsBoolean()
    opt_agree4: boolean
    @IsBoolean()
    opt_agree5: boolean
}