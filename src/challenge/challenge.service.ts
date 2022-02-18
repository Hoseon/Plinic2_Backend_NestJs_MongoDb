import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { getCurrentDate } from 'src/common/util';
import { CreateChallengeDto } from './dto/create-challenge.dto';
import { UpdateChallengeDto } from './dto/update-challenge.dto';
import { ScChallenge } from './entities/challenge.entity';

@Injectable()
export class ChallengeService {
  constructor(
    @InjectConnection() private connection: Connection,
    @InjectModel('sc_challenge') private readonly scChallengeModel: Model<ScChallenge>,
  ) { }

  async create(createChallengeDto: CreateChallengeDto) {
    const preSave = new this.scChallengeModel(createChallengeDto);
    const result = await preSave.save();
    return result;
  }

  async findIng() {
    var date = getCurrentDate();
    const findResult = await this.scChallengeModel.findOne({
      division: '진행',
      status: '활성화',
      startAt: { $lte: date },
      endAt: { $gte: date }
    }).sort({ createdAt: -1 }).limit(1)
    if (findResult == null) { 
      throw new NotFoundException();
    }
    return findResult;
  }
  
  async findEsti() {
    const findResult = await this.scChallengeModel.findOne({
      division: '예고',
      status: '활성화'
    }).sort({ createdAt: -1 }).limit(1)
    if (findResult == null) { 
      throw new NotFoundException();
    }
    return findResult;
  }

  async findOne(id: string) {
    const result = await this.scChallengeModel.findById({ _id: id });
    if (result == null) { 
      throw new NotFoundException();
    }
    return result;
  }

  update(id: number, updateChallengeDto: UpdateChallengeDto) {
    return `This action updates a #${id} challenge`;
  }

  remove(id: number) {
    return `This action removes a #${id} challenge`;
  }
}
