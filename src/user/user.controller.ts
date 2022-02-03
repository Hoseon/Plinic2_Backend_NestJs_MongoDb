import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { LoginRecordDto } from './dto/login-record.dto';
import { PushRecordDto } from './dto/push-record.dto';
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

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
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
}
