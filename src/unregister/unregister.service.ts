import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { CreateUnregisterDto } from './dto/create-unregister.dto';
import { UpdateUnregisterDto } from './dto/update-unregister.dto';
import { User } from 'src/register/entities/users.entity';
import { ScUserPhoneAuth } from 'src/register/entities/sc_user_phone_auth';
import { ScUserUnRegister } from './entities/unregister.entity';
import { getCurrentDate } from 'src/common/util';

@Injectable()
export class UnregisterService {

  constructor(
    @InjectConnection() private connection: Connection,
    @InjectModel('User') private readonly userModel: Model<User>,
    @InjectModel('sc_user_phone_auth') private readonly sc_user_phone_auth_Model: Model<ScUserPhoneAuth>,
    @InjectModel('sc_user_unregister') private readonly sc_user_unregister: Model<ScUserUnRegister>,

  ) { }

  async create(createUnregisterDto: CreateUnregisterDto) {
    const findResult = await this.userModel.findOne({ uid: createUnregisterDto.uid, name: createUnregisterDto.name })
    var unRegisterDate = getCurrentDate();
    unRegisterDate.setDate(getCurrentDate().getDate() + 14);
    if (findResult == null) throw new NotFoundException();
    
    //탈퇴 대기 명단 저장
    createUnregisterDto.unRegisterAt = unRegisterDate;
    const preSave = new this.sc_user_unregister(createUnregisterDto);
    const saveResult = await preSave.save()

    return saveResult;
  }

  findAll() {
    return `This action returns all unregister`;
  }

  findOne(id: number) {
    return `This action returns a #${id} unregister`;
  }

  update(id: number, updateUnregisterDto: UpdateUnregisterDto) {
    return `This action updates a #${id} unregister`;
  }

  remove(id: number) {
    return `This action removes a #${id} unregister`;
  }
}
