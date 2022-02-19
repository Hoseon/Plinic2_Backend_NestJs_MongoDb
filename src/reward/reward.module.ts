import { Module } from '@nestjs/common';
import { RewardService } from './reward.service';
import { RewardController } from './reward.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/register/entities/users.entity';
import { ScUserPhoneAuthSchema } from 'src/register/entities/sc_user_phone_auth';
import { ScUserRewardSchema } from './entities/reward.entity';
import { ScUserAddressSchema } from 'src/user/entities/sc_user_address.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    MongooseModule.forFeature([{ name: 'sc_user_phone_auth', schema: ScUserPhoneAuthSchema }]),
    MongooseModule.forFeature([{ name: 'sc_user_reward', schema: ScUserRewardSchema }]),
    MongooseModule.forFeature([{ name: 'sc_user_address', schema: ScUserAddressSchema }]),
  ],
  controllers: [RewardController],
  providers: [RewardService]
})
export class RewardModule {}
