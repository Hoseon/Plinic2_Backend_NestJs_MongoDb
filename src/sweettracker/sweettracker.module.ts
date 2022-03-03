import { Module } from '@nestjs/common';
import { SweettrackerService } from './sweettracker.service';
import { SweettrackerController } from './sweettracker.controller';
import { } from 'axios';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [SweettrackerController],
  providers: [SweettrackerService]
})
export class SweettrackerModule {}
