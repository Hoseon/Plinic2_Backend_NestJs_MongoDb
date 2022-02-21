import { Injectable } from '@nestjs/common';
import { CreateDevicecountDto } from './dto/create-devicecount.dto';
import { UpdateDevicecountDto } from './dto/update-devicecount.dto';

@Injectable()
export class DevicecountService {
  create(createDevicecountDto: CreateDevicecountDto) {
    return 'This action adds a new devicecount';
  }

  findAll() {
    return `This action returns all devicecount`;
  }

  findOne(id: number) {
    return `This action returns a #${id} devicecount`;
  }

  update(id: number, updateDevicecountDto: UpdateDevicecountDto) {
    return `This action updates a #${id} devicecount`;
  }

  remove(id: number) {
    return `This action removes a #${id} devicecount`;
  }
}
