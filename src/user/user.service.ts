import { Injectable, NotFoundException } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { getCurrentDate } from 'src/common/util';
import { UpdateRegisterDto } from 'src/register/dto/update-register.dto';
import { ScUserPhoneAuth } from 'src/register/entities/sc_user_phone_auth';
import { ScUserPushToken } from 'src/register/entities/sc_user_pushtoken';
import { User } from 'src/register/entities/users.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginRecordDto } from './dto/login-record.dto';
import { PhoneAuthDto } from './dto/phone-auth.dto';
import { PushRecordDto } from './dto/push-record.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ScUserLoginRecord } from './entities/sc_user_last_login.entity';

AWS.config.update({
  "accessKeyId": process.env.AWS_ACCESS_KEY_ID,
  "secretAccessKey": process.env.AWS_SECRET_ACCESS_KEY,
  "region": process.env.AWS_REGION
})

const s3 = new AWS.S3();

@Injectable()
export class UserService {

  constructor(
    @InjectConnection() private connection: Connection,
    @InjectModel('User') private readonly userModel: Model<User>,
    @InjectModel('sc_user_login_record') private readonly sc_user_login_record: Model<ScUserLoginRecord>,
    @InjectModel('sc_user_pushtoken') private readonly sc_user_pushtoken_Model: Model<ScUserPushToken>,
    @InjectModel('sc_user_phone_auth') private readonly sc_user_phone_auth_Model: Model<ScUserPhoneAuth>,
  ) { }

  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all user`;
  }

  async findOne(id: string) {
    const findResult = await this.userModel.findOne({ uid: id }).limit(1);
    if (findResult == null) {
      throw new NotFoundException('사용자를 찾지 못함');
    }
    return findResult;
  }

  //사용자 nickname 중복체크
  async findNickName(nickname: string) : Promise<Boolean> {
    const findResult = await this.userModel.findOne({ nickname: nickname }).limit(1);
    if (findResult === null) {
      return false
    }
    return true;
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
    const findReulst = await this.userModel.find({ uid: body.uid }).limit(1);
    if (findReulst.length === 0) {
      throw new NotFoundException();
    }

    const tokenFindResult = await this.sc_user_pushtoken_Model.findOne({ uid: body.uid }, {timestamps:false});
    tokenFindResult.token = body.token;
    const saveResult = await tokenFindResult.save();

    return saveResult;
  }

  async savePhoneAuth(body: PhoneAuthDto) { 
    const findResult = await this.sc_user_phone_auth_Model.findOne({ uid: body.uid }).limit(1);
    if (findResult === null) {
      const prePhoneAuthSave = new this.sc_user_phone_auth_Model(body);
      const saveResult = await prePhoneAuthSave.save();
      //인증이 완료되고 나면은 사용자 정보에도 반영해준다.
      var preGender = body.gender === 1 ? '남자' : '여자';
      const result = await this.userModel.findOneAndUpdate({ uid: body.uid }, { birthDay: body.birth, name: body.name, gender: preGender }, {new : true})
      
      return saveResult;
    } else {
      findResult.phone = body.phone;
      findResult.birth = body.birth;
      findResult.name = body.name;
      findResult.foreigner = body.foreigner;
      findResult.carrier = body.carrier;
      findResult.gender = body.gender;

      const saveResult = await findResult.save();
      
      var preGender = body.gender === 1 ? '여자' : '남자';
      const result = await this.userModel.findOneAndUpdate({ uid: body.uid }, { birthDay: body.birth, name: body.name, gender: preGender }, {new : true})
      return saveResult;
    }
    
  }

  async userPhoneAuthCheck(uid: string): Promise<ScUserPhoneAuth> {
    const findResult = await this.sc_user_phone_auth_Model.findOne({uid: uid}).limit(1);
    if (findResult === null) { 
      throw new NotFoundException();
    }

    return findResult;
  }

  async updateUserNickName(uid: string, updateRegisterDto: UpdateRegisterDto) {
    const findUser = await this.userModel.findOne({ uid: uid });
    //사용자 찾음 로직
    if (findUser == null) { throw new NotFoundException(); }

    findUser.nickname = updateRegisterDto.nickname;

    const saveResult = await findUser.save();

    return saveResult;
  }

  async userUpdateProfileImage(files: Express.Multer.File, updateUser: UpdateRegisterDto) { 
    //프로필 이미지 정보 저장
    const result = await this.userModel.findOneAndUpdate({ uid: updateUser.uid }, { avata_url: files[0].location, uid: updateUser.uid, email: updateUser.email }, {new : true})

    // console.log(updateUser.uid);
    // console.log(updateUser.email);
    // console.log(files[0].location);
    return result;
  }

  
}
