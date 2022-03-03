import { Test, TestingModule } from '@nestjs/testing';
import { SweettrackerService } from './sweettracker.service';

describe('SweettrackerService', () => {
  let service: SweettrackerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SweettrackerService],
    }).compile();

    service = module.get<SweettrackerService>(SweettrackerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
