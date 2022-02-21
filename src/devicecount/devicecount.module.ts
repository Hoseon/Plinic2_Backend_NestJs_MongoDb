import { Module } from '@nestjs/common';
import { DevicecountService } from './devicecount.service';
import { DevicecountController } from './devicecount.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ScDeviceLogSchema } from 'src/devicelog/entities/devicelog.entity';
import { ScDeviceCountSchema } from './entities/devicecount.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{name : 'sc_device_log', schema: ScDeviceLogSchema}]),
    MongooseModule.forFeature([{name : 'sc_device_count', schema: ScDeviceCountSchema}]),
  ],
  controllers: [DevicecountController],
  providers: [DevicecountService]
})
export class DevicecountModule {}
