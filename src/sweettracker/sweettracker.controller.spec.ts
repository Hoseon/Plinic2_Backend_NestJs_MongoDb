import { Test, TestingModule } from '@nestjs/testing';
import { SweettrackerController } from './sweettracker.controller';
import { SweettrackerService } from './sweettracker.service';

describe('SweettrackerController', () => {
  let controller: SweettrackerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SweettrackerController],
      providers: [SweettrackerService],
    }).compile();

    controller = module.get<SweettrackerController>(SweettrackerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
