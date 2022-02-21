import { Test, TestingModule } from '@nestjs/testing';
import { DevicelogController } from './devicelog.controller';
import { DevicelogService } from './devicelog.service';

describe('DevicelogController', () => {
  let controller: DevicelogController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DevicelogController],
      providers: [DevicelogService],
    }).compile();

    controller = module.get<DevicelogController>(DevicelogController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
