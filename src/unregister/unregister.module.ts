import { Module } from '@nestjs/common';
import { UnregisterService } from './unregister.service';
import { UnregisterController } from './unregister.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/register/entities/users.entity';
import { ScUserUnRegisterSchema } from './entities/unregister.entity';
import { ScUserPhoneAuthSchema } from 'src/register/entities/sc_user_phone_auth';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    MongooseModule.forFeature([{ name: 'sc_user_unregister', schema: ScUserUnRegisterSchema }]),
    MongooseModule.forFeature([{name : 'sc_user_phone_auth', schema: ScUserPhoneAuthSchema}]),
  ],
  controllers: [UnregisterController],
  providers: [UnregisterService]
})
export class UnregisterModule {}
