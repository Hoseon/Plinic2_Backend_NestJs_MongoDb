import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoginModule } from './login/login.module';
import { RegisterModule } from './register/register.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://plinic:plinic0608@plinic2.rdvo6.mongodb.net/plinic2?retryWrites=true'),
    LoginModule,
    RegisterModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
