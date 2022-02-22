import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { RewardService } from './reward.service';
import { CreateRewardDto } from './dto/create-reward.dto';
import { UpdateRewardDto } from './dto/update-reward.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { FilesInterceptor } from '@nestjs/platform-express';
import * as multerS3 from 'multer-s3';
import * as AWS from 'aws-sdk';
const s3 = new AWS.S3()

@ApiTags('보상받기 CRUD')
@Controller('reward')
export class RewardController {
  constructor(private readonly rewardService: RewardService) {}
  @ApiOperation({summary: '보상상품 지급 데이터 저장'})
  @Post() 
  create(@Body() createRewardDto: CreateRewardDto) {
    return this.rewardService.create(createRewardDto);
  }

  @ApiOperation({summary: '사용자 현재까지 보상상품 지급 내역 가져오기'})
  @Get()
  findAll() {
    return this.rewardService.findAll();
  }

  @ApiOperation({summary: '사용자 특정 보상상품 지급 내역 1건 가져오기'})
  @Get(':id')
  findOne(@Param('id') uid: string) {
    return this.rewardService.findOne(uid);
  }

  @ApiOperation({summary: '사용자 챌린지 보상 여부 확인하기'})
  @Get('/findCheckReward/:id/:chid')
  findCheckReward(@Param('id') uid: string, @Param('chid') chid: string) {
    return this.rewardService.findCheckReward(uid, chid);
  }

  @ApiOperation({summary: '사용자 특정 보상상품 지급 내역 1건 가져오기'})
  @Get(':checkUserAddress/:uid')
  findCheckUserAddress(@Param('uid') uid: string) {
    return this.rewardService.findCheckUserAddress(uid);
  }

  @ApiOperation({summary: '사용자 특정 보상상품 지급 수정하기'})
  @Patch(':id')
  update(@Param('id') uid: string, @Body() updateRewardDto: UpdateRewardDto) {
    return this.rewardService.update(uid, updateRewardDto);
  }

  @ApiOperation({summary: '사용자 특정 보상상품 지급 삭제하기'})
  @Delete(':id')
  remove(@Param('id') uid: string) {
    return this.rewardService.remove(uid);
  }

  @ApiOperation({ summary: '사용자 프로필 이미지 변경', description: '사용자가 프로필 - 이미지 변경을 했을때 s3 파일업로드 DB 데이터 저장' })
  @Post('/testUploadFile')
  @UseInterceptors(FilesInterceptor('images', 10, {
    storage: multerS3({
      s3: s3, 
      bucket: process.env.AWS_S3_BUCKET_NAME,
      acl: 'public-read',
      key: function(req, file, cb) {
        cb(null, file.originalname)
      }
    }),
    limits: {
      fieldNameSize: 10000,
      fieldSize: 10000,
      fileSize: 15728640, //15Mb
      
    },

  }))
  async userUpdateProfileImage( //챌린지 이미지들을 저장할때 사용한다 관리자(웹에서는) dart:io가 지원하지 않고 File을 사용할수가 없어서 별도 dio로 List<int>타입으로 보내 파일을 저장한다
    @UploadedFiles() files: Express.Multer.File) { 
    return this.rewardService.testUpdateImage(files);
  }
}
