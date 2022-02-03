import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { ScUserPushTokenSchema } from 'src/register/entities/sc_user_pushtoken';
import { ScUserLoginRecord, ScUserLoginRecordSchema } from './entities/sc_user_last_login.entity';
import { UserService } from './user.service';

const users: ScUserLoginRecord[] = [];

describe('UserService', () => {
  let service: UserService;
  let scUserLoginRecord: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getModelToken('ScUserLoginRecord'),
          useValue: ScUserLoginRecord
        }
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    scUserLoginRecord = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('사용자 로그인 기록 저장', () => { 
    it('저장된 데이터의 callback은 array',async () => {
      jest
        .spyOn(service, 'userLoginRecord')
        // .mockResolvedValue(Promise.resolve());

    })
  });
});
