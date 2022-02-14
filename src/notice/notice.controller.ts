import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { NoticeService } from './notice.service';
import { CreateNoticeDto } from './dto/create-notice.dto';
import { UpdateNoticeDto } from './dto/update-notice.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('공지사항 CRUD')
@Controller('notice')
export class NoticeController {
  constructor(private readonly noticeService: NoticeService) {}

  @ApiOperation({summary: '공지사항 등록'})
  @Post()
  create(@Body() createNoticeDto: CreateNoticeDto) {
    return this.noticeService.create(createNoticeDto);
  }

  @ApiOperation({summary: '공지사항 리스트로 가져오기'})
  @Get()
  findAll() {
    return this.noticeService.findAll();
  }

  @ApiOperation({summary: '공지사항 한개만 가져오기'})
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.noticeService.findOne(id);
  }

  @ApiOperation({summary: '공지사항 수정하기'})
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateNoticeDto: UpdateNoticeDto) {
    return this.noticeService.update(id, updateNoticeDto);
  }

  @ApiOperation({summary: '공지사항 삭제하기(데이터 플래그 바꾸기)'})
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.noticeService.remove(id);
  }
}
