import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ChallengeService } from './challenge.service';
import { CreateChallengeDto } from './dto/create-challenge.dto';
import { UpdateChallengeDto } from './dto/update-challenge.dto';

@ApiTags('케어 - 챌린지 CRUD')
@Controller('challenge')
export class ChallengeController {
  constructor(private readonly challengeService: ChallengeService) {}
  @ApiOperation({summary: '케어 챌린지 등록'})
  @Post()
  create(@Body() createChallengeDto: CreateChallengeDto) {
    return this.challengeService.create(createChallengeDto);
  }
  @ApiOperation({summary: '케어 챌린지 현재 진행 데이터 가져오기'})
  @Get()
  findAll() {
    return this.challengeService.findIng();
  }

  @ApiOperation({summary: '케어 챌린지 예고 데이터 가져오기'})
  @Get('/esti')
  findEsti() {
    return this.challengeService.findEsti();
  }

  @ApiOperation({summary: '챌린지 상세조회'})
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.challengeService.findOne(id);
  }

  @ApiOperation({summary: '케어 챌린지 수정'})
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateChallengeDto: UpdateChallengeDto) {
    return this.challengeService.update(+id, updateChallengeDto);
  }

  @ApiOperation({summary: '케어 챌린지 삭제'})
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.challengeService.remove(+id);
  }
}
