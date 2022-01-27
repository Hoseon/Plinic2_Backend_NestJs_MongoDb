import { Module } from '@nestjs/common';
import { RegisterService } from './register.service';
import { RegisterController } from './register.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './entities/users.entity';
import { ScUserPushTokenSchema } from './entities/sc_user_pushtoken';
import { ScUserAgreeSchema } from './entities/sc_user_agree';
import { ScUserMarketingPushSchema } from './entities/sc_user_marketing_push';
import { ScUserNormalPushSchema } from './entities/sc_user_normal_push';

@Module({
  imports: [
    MongooseModule.forFeature([{name: 'User', schema: UserSchema}]),
    MongooseModule.forFeature([{name: 'sc_user_pushtoken', schema: ScUserPushTokenSchema}]),
    MongooseModule.forFeature([{name: 'sc_user_agree', schema: ScUserAgreeSchema}]),
    MongooseModule.forFeature([{name: 'sc_user_marketing_push', schema: ScUserMarketingPushSchema}]),
    MongooseModule.forFeature([{name: 'sc_user_normal_push', schema: ScUserNormalPushSchema}]),
  ],
  controllers: [RegisterController],
  providers: [RegisterService],
  exports: [RegisterService],
})
export class RegisterModule {}
