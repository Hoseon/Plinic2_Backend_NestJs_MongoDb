import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { ScUserAddress } from 'src/user/entities/sc_user_address.entity';
import { User } from 'src/user/entities/user.entity';
import { CreateRewardDto } from './dto/create-reward.dto';
import { UpdateRewardDto } from './dto/update-reward.dto';
import { ScUserReward } from './entities/reward.entity';

@Injectable()
export class RewardService {

  constructor(
    @InjectConnection() private connection: Connection,
    @InjectModel('User') private readonly userModel: Model<User>,
    @InjectModel('sc_user_reward') private readonly sc_user_reward: Model<ScUserReward>,
    @InjectModel('sc_user_address') private readonly sc_user_address: Model<ScUserAddress>,
  ) { }
  async create(createRewardDto: CreateRewardDto) {
    const preSave = new this.sc_user_reward(createRewardDto);
    const saveResult = await preSave.save();
    return saveResult;
  }

  findAll() {
    return `This action returns all reward`;
  }

  async findOne(uid: string) {
    const findResult = await this.sc_user_reward.findOne({ uid: uid });
    if (findResult == null) { 
      throw new NotFoundException();
    }
    return findResult;
  }

  async findCheckUserAddress(uid: string) {
    const findResult = await this.sc_user_address.findOne({ uid: uid, isDefault: true });
    if (findResult == null) { 
      throw new NotFoundException();
    }
    return findResult;
  }

  async findCheckReward(uid: string, chid: string) { 
    const findResult = await this.sc_user_reward.findOne({ uid: uid, challengeId: chid });
    if (findResult == null) { 
      throw new NotFoundException();
    }
    return findResult;
  }

  update(id: string, updateRewardDto: UpdateRewardDto) {
    return `This action updates a #${id} reward`;
  }

  remove(id: string) {
    return `This action removes a #${id} reward`;
  }

  async testUpdateImage(files: Express.Multer.File) { 
    //프로필 이미지 정보 저장
    console.log(files);
    //rewardSmallImage@3x.png
    // console.log(updateUser.uid);
    // console.log(updateUser.email);
    // console.log(files[0].location);
    return files;
  }

}
