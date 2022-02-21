import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DevicecountService } from './devicecount.service';
import { CreateDevicecountDto } from './dto/create-devicecount.dto';
import { UpdateDevicecountDto } from './dto/update-devicecount.dto';

@Controller('devicecount')
export class DevicecountController {
  constructor(private readonly devicecountService: DevicecountService) {}

  @Post()
  create(@Body() createDevicecountDto: CreateDevicecountDto) {
    return this.devicecountService.create(createDevicecountDto);
  }

  @Get()
  findAll() {
    return this.devicecountService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.devicecountService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDevicecountDto: UpdateDevicecountDto) {
    return this.devicecountService.update(+id, updateDevicecountDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.devicecountService.remove(+id);
  }
}
