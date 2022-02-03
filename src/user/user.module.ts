import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ScUserLoginRecordSchema } from './entities/sc_user_last_login.entity';
import { UserSchema } from 'src/register/entities/users.entity';
import { ScUserPushTokenSchema } from 'src/register/entities/sc_user_pushtoken';

@Module({
  imports: [
    MongooseModule.forFeature([{name: 'User', schema: UserSchema}]),
    MongooseModule.forFeature([{name : 'sc_user_login_record', schema: ScUserLoginRecordSchema}]),
    MongooseModule.forFeature([{name : 'sc_user_pushtoken', schema: ScUserPushTokenSchema}])
  ],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}
