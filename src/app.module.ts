import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoginModule } from './login/login.module';
import { RegisterModule } from './register/register.module';
import { UserModule } from './user/user.module';
import { NoticeModule } from './notice/notice.module';
import { UnregisterModule } from './unregister/unregister.module';
import { RewardModule } from './reward/reward.module';
import { ChallengeModule } from './challenge/challenge.module';
import { DevicelogModule } from './devicelog/devicelog.module';
import { DevicecountModule } from './devicecount/devicecount.module';
import * as timeZone from 'mongoose-timezone';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://plinic:plinic0608@plinic2.rdvo6.mongodb.net/plinic2?retryWrites=true',
      {
        connectionFactory: (connection) => {
          connection.plugin(timeZone);
          return connection;
        }
      }),
    LoginModule,
    RegisterModule,
    UserModule,
    NoticeModule,
    UnregisterModule,
    RewardModule,
    ChallengeModule,
    DevicelogModule,
    DevicecountModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
