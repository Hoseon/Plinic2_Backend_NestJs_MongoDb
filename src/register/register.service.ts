import { BadRequestException, ConflictException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { CreateRegisterDto } from './dto/create-register.dto';
import { ScUserAgreeDto } from './dto/sc_user_agree.dto';
import { ScUserPushTokenDto } from './dto/sc_user_pushtoken.dto';
import { UpdateRegisterDto } from './dto/update-register.dto';
import { ScUserAgree } from './entities/sc_user_agree';
import { ScUserMarketingPush } from './entities/sc_user_marketing_push';
import { ScUserNormalPush } from './entities/sc_user_normal_push';
import { ScUserPushToken } from './entities/sc_user_pushtoken';
import { User } from './entities/users.entity';

@Injectable()
export class RegisterService {

  constructor(
    @InjectConnection() private connection: Connection,
    @InjectModel('User') private readonly userModel: Model<User>,
    @InjectModel('sc_user_pushtoken') private readonly sc_user_pushtoken_Model: Model<ScUserPushToken>,
    @InjectModel('sc_user_agree') private readonly sc_user_agree: Model<ScUserAgree>,
    @InjectModel('sc_user_marketing_push') private readonly sc_user_marketing_push: Model<ScUserMarketingPush>,
    @InjectModel('sc_user_normal_push') private readonly sc_user_normal_push: Model<ScUserNormalPush>,
  ) { }


  async create(createRegisterDto: CreateRegisterDto, scUserPushToken: ScUserPushTokenDto, agreeArray: ScUserAgreeDto) {
    const session = await this.connection.startSession();

    await session.withTransaction(async () => {
      const findResult = await this.userModel.find({ uid: createRegisterDto.uid });
      if (findResult.length >= 1) {
        throw new ConflictException('사용자 uid 존재함');
      }
      console.log('111111111111111');

      const findEmail = await this.userModel.find({ email: createRegisterDto.email });
      if (findEmail.length >= 1) {
        throw new ConflictException('사용자 email 존재함');
      }
      console.log('222222222222222');
      const newUser = new this.userModel(createRegisterDto);
      const result = await newUser.save();
        // .then(() => { }, () => { });
      console.log('33333333333333333');
      if (result.uid === null) {
        throw new NotFoundException();
      }
      console.log('44444444444444');
      if (result.gender === null) { 
        throw new BadRequestException();
      }
      console.log('555555555555555');
      if (result.birthDay === null) { 
        throw new BadRequestException();
      }
      console.log('66666666666666');
      
      const newToken = new this.sc_user_pushtoken_Model(scUserPushToken);
      console.log('777777777777777');
      const pushResult = await newToken.save();
      console.log('888888888888888');

      const agree = new this.sc_user_agree(agreeArray);
      console.log('99999999999999');

      const agreeResul = await agree.save();
      console.log('10000000000000');

      

      if (agree.opt_agree5 === false) {
        
        const marketPushResult = new this.sc_user_marketing_push({uid: result.uid, useYN: false});
        await marketPushResult.save();
      console.log('11 11 11 11 11 11 11');

      } else {
        const marketPushResult = new this.sc_user_marketing_push({uid: result.uid, useYN: true});
        await marketPushResult.save();
        console.log('12 12 12 12 12 12 12 ');
      }

      const normalPushResult = new this.sc_user_normal_push({ uid: result.uid, useYN: true })
      const resultPush = await normalPushResult.save();
      console.log('13 13 13 13 13 13 13 13 13 ');

      return result.uid;
      
    });
    console.log('14 14 14 14 14 14 14 14 14 ');
    session.endSession();
    console.log('15 15 15 15 15 15 15 15 15 ');
    

    
    
  }

  findAll() {
    return `This action returns all register`;
  }

  findOne(id: number) {
    return `This action returns a #${id} register`;
  }

  update(id: number, updateRegisterDto: UpdateRegisterDto) {
    return `This action updates a #${id} register`;
  }

  remove(id: number) {
    return `This action removes a #${id} register`;
  }
}
