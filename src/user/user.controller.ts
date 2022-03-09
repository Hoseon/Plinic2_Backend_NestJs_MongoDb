import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoginRecordDto } from './dto/login-record.dto';
import { PushRecordDto } from './dto/push-record.dto';
import { PhoneAuthDto } from './dto/phone-auth.dto';
import { UpdateRegisterDto } from 'src/register/dto/update-register.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import * as multerS3 from 'multer-s3';
import * as AWS from 'aws-sdk';
import 'dotenv/config';
import { CreateRegisterDto } from 'src/register/dto/create-register.dto';
import { AddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';

const s3 = new AWS.S3()

@ApiTags('사용자 정보')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @ApiOperation({
    summary: '특정 사용자 정보 가져 오기',
    description : '로그인시, 사용자정보 재 조회시 사용'
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }

  @ApiOperation({
    summary: '특정 사용자 nickname 중복체크',
    description : 'nickname이 존재 하면 true, 존재하지 않으면 false를 돌려 준다'
  })
  @Get('/findNickName/:nickname')
  findNickName(@Param('nickname') nickname: string) {
    return this.userService.findNickName(nickname);
  }
  
  @ApiOperation({summary: '사용자 로그인 기록 저장' , description : '사용자 앱 on시 로그인 기록 저장'})
  @Post('/lastLoginRecord')
  userLoginRecord(@Body() body: LoginRecordDto) { 
    return this.userService.userLoginRecord(body);
  }

  @ApiOperation({summary: '사용자 PushToken 기록 저장' , description : '사용자 로그인시 마다 pushToken정보 새로 저장'})
  @Post('/lastPushTokenRecord')
  userPushTokenRecord(@Body() body: PushRecordDto) { 
    return this.userService.userPushTokenRecord(body);
  }

  @ApiOperation({ summary: '사용자 본인인증 정보 저장' })
  @Post('/userPhoneAuth')
  savePhoneAuth(@Body() body: PhoneAuthDto) { 
    return this.userService.savePhoneAuth(body);
  }

  @ApiOperation({ summary: '사용자 본인인증 정보 저장 유무 확인', description: '사용자가 인증을 한 이력이 있는지 확인(회원정보 수정에 활용)' })
  @Get('/userPhoneAuthCheck/:uid')
  userPhoneAuthCheck(@Param('uid') uid: string) { 
    return this.userService.userPhoneAuthCheck(uid);
  }

  @ApiOperation({ summary: '사용자 본인인증 정보 저장 유무 확인', description: '사용자가 인증을 한 이력이 있는지 확인(ID찾기에 활용)' })
  @Get('/userPhoneAuthCheckFindId/:phone')
  userPhoneAuthCheckFindId(@Param('phone') phone: string) { 
    return this.userService.userPhoneAuthCheckFindId(phone);
  }

  @ApiOperation({ summary: '사용자 닉네임 변경', description: '사용자가 프로필 - 닉네임 변경을 했을대 데이터 저장' })
  @Patch('/userUpdateNickName/:uid')
  userUpdateNickName(@Param('uid') uid: string, @Body() body: UpdateRegisterDto) { 
    return this.userService.updateUserNickName(uid, body);
  }

  @ApiOperation({ summary: '사용자 프로필 이미지 변경', description: '사용자가 프로필 - 이미지 변경을 했을때 s3 파일업로드 DB 데이터 저장' })
  @ApiResponse({ status: 201, type: CreateRegisterDto, description: '프로필 이미지가 s3에 잘 올라가면 user정보를 반환한다.'})
  @Post('/userUpdateProfileImage')
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
  async userUpdateProfileImage(
    @UploadedFiles() files: Express.Multer.File,
    @Body() body: UpdateRegisterDto
  ) { 
    return this.userService.userUpdateProfileImage(files, body);
  }

  @ApiOperation({ summary: '사용자 서비스 알림 상태 가져 오기' })
  @Get('/getUserPush/:uid')
  getUserPush(@Param('uid') uid: string) {
    return this.userService.getUserPush(uid);
  }

  @ApiOperation({ summary: '사용자 서비스알림 변경', description: '서비스 알림을 switch하였을대 알림 여부를 true/false로 변경한다' })
  @Patch('/updateNormalPush/:uid/:useYn')
  userUpdateNormalPush(@Param('uid') uid: string, @Param('useYn') useYn : boolean) { 
    return this.userService.updateNormalPush(uid, useYn);
  }

  @ApiOperation({ summary: '사용자 서비스 알림 상태 가져 오기' })
  @Get('/getUserMarketingPush/:uid')
  getUserMarketingPush(@Param('uid') uid: string) {
    return this.userService.getUserMarketingPush(uid);
  }

  @ApiOperation({ summary: '사용자 마케팅알림 변경', description: '마케팅 알림을 switch하였을대 알림 여부를 true/false로 변경한다' })
  @Patch('/updateMarketingPush/:uid/:useYn')
  updateMarketingPush(@Param('uid') uid: string, @Param('useYn') useYn : boolean) { 
    return this.userService.updateMarketingPush(uid, useYn);
  }

  @ApiOperation({ summary: '사용자 주소록 가져오기' })
  @Get('/getUserAddress/:uid')
  getUserAddress(@Param('uid') uid: string) { 
    return this.userService.getUserAddresses(uid);
  }


  @ApiOperation({ summary: '사용자 주소록 추가' })
  @Post('/createAddress/:uid')
  createUserAddress(@Param('uid') uid: string, @Body() body: AddressDto) { 
    return this.userService.createUserAddress(uid, body);
  }

  @ApiOperation({ summary: '사용자 주소록 삭제' })
  @Delete('/delAddress/:id')
  deleteUserAddress(@Param('id') _id: string) { 
    return this.userService.deleteUserAddress(_id);
  }

  @ApiOperation({ summary: '사용자 주소록 수정' })
  @Patch('/updateAddress/:uid/:id')
  updateUserAddress(@Param('uid') uid: string, @Param('id') _id: string, @Body() body: UpdateAddressDto) { 
    return this.userService.updateUserAddress(uid, _id, body);
  }


}
