import { Controller, Get, Post, Body, Patch, Param, Delete, ConflictException } from '@nestjs/common';
import { RegisterService } from './register.service';
import { CreateRegisterDto } from './dto/create-register.dto';
import { UpdateRegisterDto } from './dto/update-register.dto';
import { ApiConflictResponse, ApiCreatedResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ScUserPushTokenDto } from './dto/sc_user_pushtoken.dto';
import { ScUserAgreeDto } from './dto/sc_user_agree.dto';

@ApiTags('SNS인증 후 Monodg 회원정보저장 (회원정보, 토큰정보, 약관동의정보, 알림유무)') 
@Controller('register')
export class RegisterController {
  constructor(private readonly registerService: RegisterService) {}
  
  @ApiConflictResponse({description: '사용자가 이미 존재함'})
  @ApiCreatedResponse({description : '사용자 생성 완료'})
  @ApiOperation({ summary: '회원가입', description: '파이어베이스 인증을 통해 성공한 사람은 자체 database에 회원관리 정보를 저장한다.' })
  @Post()
  create(@Body('user') createRegisterDto: CreateRegisterDto, @Body('token') scUserPushToken: ScUserPushTokenDto, @Body('agree') agree: ScUserAgreeDto) {
    return this.registerService.create(createRegisterDto, scUserPushToken, agree);
  }

  @Get()
  findAll() {
    return this.registerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.registerService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRegisterDto: UpdateRegisterDto) {
    return this.registerService.update(+id, updateRegisterDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.registerService.remove(+id);
  }
}
