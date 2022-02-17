import { Module } from '@nestjs/common';
import { ChallengeService } from './challenge.service';
import { ChallengeController } from './challenge.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ScChallenge, ScChallengeSchema } from './entities/challenge.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'sc_challenge', schema: ScChallengeSchema}]),
  ],
  controllers: [ChallengeController],
  providers: [ChallengeService]
})
export class ChallengeModule {}
