import { BadRequestException, ConsoleLogger, ForbiddenException, Injectable, NotFoundException, Res } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { assert } from 'console';
import { Connection, Model } from 'mongoose';
import { getCurrentDate } from 'src/common/util';
import { ScDeviceCount } from 'src/devicecount/entities/devicecount.entity';
import { CreateDevicelogDto } from './dto/create-devicelog.dto';
import { UpdateDevicelogDto } from './dto/update-devicelog.dto';
import { ScDeviceLog } from './entities/devicelog.entity';

@Injectable()
export class DevicelogService {
  constructor(
    @InjectConnection() private connection: Connection,
    @InjectModel('sc_device_log') private readonly sc_device_log: Model<ScDeviceLog>,
    @InjectModel('sc_device_count') private readonly sc_device_count: Model<ScDeviceCount>,
  ) { }
  async create(createDevicelogDto: CreateDevicelogDto) {
    var today = getCurrentDate().toISOString().substring(0,10);
    const session = await this.connection.startSession();
    
    const trResult = await session.withTransaction(async () => {

      const saveResult = await this.sc_device_log.findOneAndUpdate({
        uid: createDevicelogDto.uid
      }, {
        uid: createDevicelogDto.uid,
        email: createDevicelogDto.email,
        $push: {
          log: [{
            time: createDevicelogDto.log[0].time,
            createdTime: getCurrentDate() //현재 날짜로 저장
          }],
        },
      }, { upsert: true }).session(session);
      
      
      //사용자 총 시간을 구해옴
      const logResult = await this.getUserTimeLog(createDevicelogDto.uid);
      var totalTime = 0;
      //초기사용자인지 아닌지 시간으로 구분
      if (logResult.length === 0) { totalTime = +createDevicelogDto.log[0].time };
      if (logResult.length !== 0) { totalTime = +createDevicelogDto.log[0].time + +logResult[0].pointsum };
      
      
      if (totalTime >= 150) {
        const countFindResult = await this.sc_device_count.findOne({ uid: createDevicelogDto.uid, 'countLog$.createdAt' : {$gte : new Date(`${today}T00:00:00.000Z`)}})
        if(countFindResult !== null) {
        const countSaveResult = await this.sc_device_count.findOneAndUpdate({
          uid: createDevicelogDto.uid
        }, {
          uid: createDevicelogDto.uid,
          email: createDevicelogDto.email,
          devicelog: saveResult._id,
          $push: {
            countLog: [{
              createdAt: getCurrentDate()
            }]
          }
        }, {
          upsert: true
        }).session(session);
        }
      }
    });
    session.endSession();
    return await this.getUserTimeLog(createDevicelogDto.uid);
    
  }

  async getCalendarData(id: string): Promise<any> {
    var unwind = { $unwind: "$countLog" };
    var group = { $group: { _id: "$countLog.createdAt", count: { $sum: "$countLog.count" } } }
    var pipeLine = [unwind, group]
    const findResult = await this.sc_device_count.aggregate(pipeLine);
    return findResult;
  }

  async getUserTimeLog(id: string): Promise<any> { 
    var today = getCurrentDate().toISOString().substring(0,10);

    //aggregate하기 위한 파이프 라인을 구성한다.
    var unwind = { $unwind: "$log" };
    var match = { $match: { uid: id, "log.createdTime": {$gte : new Date(`${today}T00:00:00.000Z`)} }};
    var group = { $group: { _id: "$uid", pointsum: { $sum: "$log.time" } } };
    var pipeline = [unwind, match, group];
    const findResult = this.sc_device_log.aggregate(pipeline);
    return findResult;
  }

  async findAll() {
    const anybody = await this.getUserTimeLog('kakao:1754055337');
    return anybody; 
  }

  findOne(uid: string) {
    return `This action returns a #${uid} devicelog`;
  }

  update(id: number, updateDevicelogDto: UpdateDevicelogDto) {
    return `This action updates a #${id} devicelog`;
  }

  remove(id: number) {
    return `This action removes a #${id} devicelog`;
  }
}
