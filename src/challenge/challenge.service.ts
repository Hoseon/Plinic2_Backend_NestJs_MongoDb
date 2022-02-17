import { Injectable } from '@nestjs/common';
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
    await preSave.save().then((result) => {
      return result;
    }, (error) => { 
      return error;
    });
  }

  findAll() {
    console.log(getCurrentDate());
    console.log(getCurrentDate().toLocaleDateString());
    console.log(getCurrentDate().toLocaleString());
    console.log(getCurrentDate().toLocaleTimeString());
    return getCurrentDate();
  }

  async findOne(id: string) {
    var date = getCurrentDate();
    const result = await this.scChallengeModel.find({
      startAt: { $lte: date }, endAt: {$gte: date}
    }).limit(1);
    return result;
  }

  update(id: number, updateChallengeDto: UpdateChallengeDto) {
    return `This action updates a #${id} challenge`;
  }

  remove(id: number) {
    return `This action removes a #${id} challenge`;
  }
}
