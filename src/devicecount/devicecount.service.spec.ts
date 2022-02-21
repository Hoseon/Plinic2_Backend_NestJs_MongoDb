import { Test, TestingModule } from '@nestjs/testing';
import { DevicecountService } from './devicecount.service';

describe('DevicecountService', () => {
  let service: DevicecountService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DevicecountService],
    }).compile();

    service = module.get<DevicecountService>(DevicecountService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
