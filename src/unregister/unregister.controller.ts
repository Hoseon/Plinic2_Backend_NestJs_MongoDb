import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UnregisterService } from './unregister.service';
import { CreateUnregisterDto } from './dto/create-unregister.dto';
import { UpdateUnregisterDto } from './dto/update-unregister.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('사용자 탈퇴 API')
@Controller('unregister')
export class UnregisterController {
  constructor(private readonly unregisterService: UnregisterService) {}

  @ApiOperation({summary: '사용자 회원 탈퇴 심사 데이터 저장'})
  @Post()
  create(@Body() createUnregisterDto: CreateUnregisterDto) {
    return this.unregisterService.create(createUnregisterDto);
  }

  @ApiOperation({summary: '사용자 회원 탈퇴 대기 명단 리스트 가져오기'})
  @Get()
  findAll() {
    return this.unregisterService.findAll();
  }

  @ApiOperation({summary: '사용자 회원 탈퇴 대기 1명 데이터 가져오기'})
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.unregisterService.findOne(+id);
  }

  @ApiOperation({summary: '사용자 회원 탈퇴 대기 수정'})
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUnregisterDto: UpdateUnregisterDto) {
    return this.unregisterService.update(+id, updateUnregisterDto);
  }

  @ApiOperation({summary: '사용자 회원 탈퇴 대기 데이터 삭제'})
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.unregisterService.remove(+id);
  }
}
