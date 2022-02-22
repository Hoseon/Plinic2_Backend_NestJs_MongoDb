import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { DevicecountService } from './devicecount.service';
import { CreateDevicecountDto } from './dto/create-devicecount.dto';
import { UpdateDevicecountDto } from './dto/update-devicecount.dto';

@ApiTags('사용자 누적회수 구해오기')
@Controller('devicecount')
export class DevicecountController {
  constructor(private readonly devicecountService: DevicecountService) {}
  
  @ApiOperation({summary : '사용자의 캘린더 리스트를 가져 오기'})
  @Get(':uid')
  async findOne(@Param('uid') uid: string) {
    return await this.devicecountService.findOne(uid);
  }

  @ApiOperation({ summary: '사용자의 이번달 총 사용 횟수를 가져 온다' })
  @Get('/getMonthUseCount/:uid')
  getMonthCount(@Param('uid') uid: string) { 
    return this.devicecountService.getMonthUseCount(uid);
  }

  @ApiOperation({ summary: '사용자의 전체 총 사용 횟수를 가져 온다' })
  @Get('/getAllUseCount/:uid')
  getAllCount(@Param('uid') uid: string) { 
    return this.devicecountService.getAllUseCount(uid);
  }
  
}
