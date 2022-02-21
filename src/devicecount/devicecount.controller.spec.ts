import { Test, TestingModule } from '@nestjs/testing';
import { DevicecountController } from './devicecount.controller';
import { DevicecountService } from './devicecount.service';

describe('DevicecountController', () => {
  let controller: DevicecountController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DevicecountController],
      providers: [DevicecountService],
    }).compile();

    controller = module.get<DevicecountController>(DevicecountController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
