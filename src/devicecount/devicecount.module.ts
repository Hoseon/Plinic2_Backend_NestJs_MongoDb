import { Module } from '@nestjs/common';
import { DevicecountService } from './devicecount.service';
import { DevicecountController } from './devicecount.controller';

@Module({
  controllers: [DevicecountController],
  providers: [DevicecountService]
})
export class DevicecountModule {}
