import { Test, TestingModule } from '@nestjs/testing';
import { UnregisterController } from './unregister.controller';
import { UnregisterService } from './unregister.service';

describe('UnregisterController', () => {
  let controller: UnregisterController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UnregisterController],
      providers: [UnregisterService],
    }).compile();

    controller = module.get<UnregisterController>(UnregisterController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
