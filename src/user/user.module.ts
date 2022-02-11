import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ScUserLoginRecordSchema } from './entities/sc_user_last_login.entity';
import { UserSchema } from 'src/register/entities/users.entity';
import { ScUserPushTokenSchema } from 'src/register/entities/sc_user_pushtoken';
import { ScUserPhoneAuthSchema } from 'src/register/entities/sc_user_phone_auth';
import { ScUserNormalPushSchema } from 'src/register/entities/sc_user_normal_push';
import { ScUserMarketingPushSchema } from 'src/register/entities/sc_user_marketing_push';

@Module({
  imports: [
    MongooseModule.forFeature([{name: 'User', schema: UserSchema}]),
    MongooseModule.forFeature([{name : 'sc_user_login_record', schema: ScUserLoginRecordSchema}]),
    MongooseModule.forFeature([{name : 'sc_user_pushtoken', schema: ScUserPushTokenSchema}]),
    MongooseModule.forFeature([{name : 'sc_user_phone_auth', schema: ScUserPhoneAuthSchema}]),
    MongooseModule.forFeature([{name : 'sc_user_normal_push', schema: ScUserNormalPushSchema}]),
    MongooseModule.forFeature([{name : 'sc_user_marketing_push', schema: ScUserMarketingPushSchema}]),
  ],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}
