import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { ScDeviceLog } from 'src/devicelog/entities/devicelog.entity';
import { CreateDevicecountDto } from './dto/create-devicecount.dto';
import { UpdateDevicecountDto } from './dto/update-devicecount.dto';
import { ScDeviceCount } from './entities/devicecount.entity';

@Injectable()
export class DevicecountService {
  constructor(
    @InjectConnection() private connection: Connection,
    @InjectModel('sc_device_log') private readonly sc_device_log: Model<ScDeviceLog>,
    @InjectModel('sc_device_count') private readonly sc_device_count: Model<ScDeviceCount>,
  ) { }
  async findOne(uid: string): Promise<any> {
    var match = { $match: {uid: uid}}
    var unwind = { $unwind: "$countLog" };
    var group = { $group: { _id: "$countLog.createdAt", count: { $sum: "$countLog.count" } },}
    // var sort = { $sort : {_id : 1} }
    var pipeLine = [match, unwind, group]
    const findResult = await this.sc_device_count.aggregate(pipeLine).sort({_id: 1});
    return findResult;
  }
  
}
