import { Module } from '@nestjs/common';
import { DevicelogService } from './devicelog.service';
import { DevicelogController } from './devicelog.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ScDeviceLogSchema } from './entities/devicelog.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{name : 'sc_device_log', schema: ScDeviceLogSchema}])
  ],
  controllers: [DevicelogController],
  providers: [DevicelogService]
})
export class DevicelogModule {}
