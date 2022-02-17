import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsNumber, IsString } from "class-validator";

export class CreateChallengeDto {
    @ApiProperty({ example: '진행' })
    @IsString()
    readonly division: string;
    
    @ApiProperty({ example: '2022-02-17 08:16' })
    @IsDate()
    readonly startAt: Date;

    @ApiProperty({ example: '2022-02-25 07:16' })
    @IsDate()
    readonly endAt: string;

    @ApiProperty({ example: 10 })
    @IsNumber()
    readonly useDay: number;

    @ApiProperty({ example: '상품' })
    @IsString()
    readonly rewardType: string

    @ApiProperty({ example: '피부에 좋은 노니 1BOX 피부에 좋은 노니 1BOX!' })
    @IsString()
    readonly rewardName: string

    @ApiProperty({ example: '나는 NONI 나는 NONI 나는 NONI 나는 NON' })
    @IsString()
    readonly title: string

    @ApiProperty({ example: '똑똑똑~! 나 노니인데!! 똑똑똑~! 나 노니인데!!' })
    @IsString()
    readonly desc: string

    @ApiProperty({ example: 'https://plinic.s3.ap-northeast-2.amazonaws.com/giftImageReward%403x.png' })
    @IsString()
    readonly img1_url: string

    @ApiProperty({ example: 'https://plinic.s3.ap-northeast-2.amazonaws.com/rewardSmallImage%403x.png' })
    @IsString()
    readonly img2_url: string

    @ApiProperty({ example: 'https://plinic.s3.ap-northeast-2.amazonaws.com/rewardInfor%403x.png' })
    @IsString()
    readonly img3_url: string

    @ApiProperty({ example: '활성화' })
    @IsString()
    readonly status: string

 }
