import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DevicelogService } from './devicelog.service';
import { CreateDevicelogDto } from './dto/create-devicelog.dto';
import { UpdateDevicelogDto } from './dto/update-devicelog.dto';

@Controller('devicelog')
export class DevicelogController {
  constructor(private readonly devicelogService: DevicelogService) {}

  @Post()
  create(@Body() createDevicelogDto: CreateDevicelogDto) {
    return this.devicelogService.create(createDevicelogDto);
  }

  @Get()
  findAll() {
    return this.devicelogService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.devicelogService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDevicelogDto: UpdateDevicelogDto) {
    return this.devicelogService.update(+id, updateDevicelogDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.devicelogService.remove(+id);
  }
}
