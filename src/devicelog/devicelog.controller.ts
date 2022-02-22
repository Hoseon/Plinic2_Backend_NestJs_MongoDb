import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { DevicelogService } from './devicelog.service';
import { CreateDevicelogDto } from './dto/create-devicelog.dto';
import { UpdateDevicelogDto } from './dto/update-devicelog.dto';

@ApiTags('사용자 디바이스 사용기록 누적 CRUD')
@Controller('devicelog')
export class DevicelogController {
  constructor(private readonly devicelogService: DevicelogService) {}
  @ApiOperation({summary : '사용자의 시간 기록을 측정', description : '사용자가 사용한 기록만큼만 누적하고 2분30초(150초)가 넘었을대 카운트 기록을 해준다'})
  @Post()
  create(@Body() createDevicelogDto: CreateDevicelogDto) {
    return this.devicelogService.create(createDevicelogDto);
  }

  @ApiOperation({ summary: '이달의 챌린지 시간의 기록된 모든 카운트를 가져 온다.' })
  @Get('/monthlyTimeUserCount')
  getMonthlyTimeUserCount() {
    return this.devicelogService.monthlyTimeUserCount();
  }


  @Get()
  findAll() {
    return this.devicelogService.findAll();
  }
  
  @ApiOperation({ summary: '사용자의 이번달 총 사용시간을 가져온다' })
  @Get('/getMonthUseTime/:uid')
  getMonthTime(@Param('uid') uid: string) { 
    return this.devicelogService.getMonthUseTime(uid);
  }
  
  @ApiOperation({ summary: '사용자의 캘린더에 보여질 기록을 가져온다.' })
  @Get('/getCalendarData/:uid')
  getCalendarData(@Param('uid') uid: string) {
    return this.devicelogService.findOne(uid);
  }

  

}
