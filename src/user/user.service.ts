import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { getCurrentDate } from 'src/common/util';
import { ScUserPushToken } from 'src/register/entities/sc_user_pushtoken';
import { User } from 'src/register/entities/users.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginRecordDto } from './dto/login-record.dto';
import { PushRecordDto } from './dto/push-record.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ScUserLoginRecord } from './entities/sc_user_last_login.entity';

@Injectable()
export class UserService {

  constructor(
    @InjectConnection() private connection: Connection,
    @InjectModel('User') private readonly userModel: Model<User>,
    @InjectModel('sc_user_login_record') private readonly sc_user_login_record: Model<ScUserLoginRecord>,
    @InjectModel('sc_user_pushtoken') private readonly sc_user_pushtoken_Model: Model<ScUserPushToken>,
  ) { }

  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async userLoginRecord(body: LoginRecordDto): Promise<ScUserLoginRecord> { 
    const findReulst = await this.userModel.find({ uid: body.uid }).limit(1).lean();
    if (findReulst.length === 0) {
      throw new NotFoundException();
    }

    const saveData = new this.sc_user_login_record({ uid: body.uid, email: findReulst[0].email });
    const saveResult = await saveData.save();
    return saveResult;
  }

  async userPushTokenRecord(body: PushRecordDto) { 
    const findReulst = await this.userModel.find({ uid: body.uid }).limit(1).lean();
    if (findReulst.length === 0) {
      throw new NotFoundException();
    }

    const tokenFindResult = await this.sc_user_pushtoken_Model.findOne({ uid: body.uid }, {timestamps:false});
    tokenFindResult.token = body.token;
    const saveResult = await tokenFindResult.save();

    return saveResult;
  }
}
