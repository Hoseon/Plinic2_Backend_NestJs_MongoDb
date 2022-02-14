import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoginModule } from './login/login.module';
import { RegisterModule } from './register/register.module';
import { DeviceLogModule } from './device-log/device-log.module';
import { UserModule } from './user/user.module';
import { NoticeModule } from './notice/notice.module';
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
    DeviceLogModule,
    UserModule,
    NoticeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
