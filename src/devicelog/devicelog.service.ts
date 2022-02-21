import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { getCurrentDate } from 'src/common/util';
import { CreateDevicelogDto } from './dto/create-devicelog.dto';
import { UpdateDevicelogDto } from './dto/update-devicelog.dto';
import { ScDeviceLog } from './entities/devicelog.entity';

@Injectable()
export class DevicelogService {
  constructor(
    @InjectConnection() private connection: Connection,
    @InjectModel('sc_device_log') private readonly sc_device_log: Model<ScDeviceLog>
  ) { }
  async create(createDevicelogDto: CreateDevicelogDto) {
    var sumPoint: number = 0;
    // createDevicelogDto.log[0].createdTime = new Date(Date.now());
    createDevicelogDto.email = 'chs1025@gmail.com';
    createDevicelogDto.uid = 'kakao:1754055337';
    const preSave = new this.sc_device_log(createDevicelogDto);
    const saveresult = await preSave.save();
    return saveresult;
  }

  findAll() {
    return `This action returns all devicelog`;
  }

  findOne(id: number) {
    return `This action returns a #${id} devicelog`;
  }

  update(id: number, updateDevicelogDto: UpdateDevicelogDto) {
    return `This action updates a #${id} devicelog`;
  }

  remove(id: number) {
    return `This action removes a #${id} devicelog`;
  }
}
