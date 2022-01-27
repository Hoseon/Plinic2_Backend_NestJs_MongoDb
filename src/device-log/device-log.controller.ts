import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { DeviceLogService } from './device-log.service';
import { CreateDeviceLogDto } from './dto/create-device-log.dto';
import { UpdateDeviceLogDto } from './dto/update-device-log.dto';

@ApiTags('사용자 기기 사용 기록(누적 사용일수)')
@Controller('device-log')
export class DeviceLogController {
  constructor(private readonly deviceLogService: DeviceLogService) {}

  @Post()
  create(@Body() createDeviceLogDto: CreateDeviceLogDto) {
    return this.deviceLogService.create(createDeviceLogDto);
  }

  @Get()
  findAll() {
    return this.deviceLogService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.deviceLogService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDeviceLogDto: UpdateDeviceLogDto) {
    return this.deviceLogService.update(+id, updateDeviceLogDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.deviceLogService.remove(+id);
  }
}
