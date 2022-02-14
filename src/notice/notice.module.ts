import { Module } from '@nestjs/common';
import { NoticeService } from './notice.service';
import { NoticeController } from './notice.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ScNoticeSchema } from './entities/notice.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{name: 'sc_notice', schema: ScNoticeSchema}])
  ],
  controllers: [NoticeController],
  providers: [NoticeService]
})
export class NoticeModule {}
