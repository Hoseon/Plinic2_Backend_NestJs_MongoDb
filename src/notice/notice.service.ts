import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { CreateNoticeDto } from './dto/create-notice.dto';
import { UpdateNoticeDto } from './dto/update-notice.dto';
import { ScNotice } from './entities/notice.entity';

@Injectable()
export class NoticeService {

  constructor(
    @InjectConnection() private connection: Connection,
    @InjectModel('sc_notice') private readonly sc_notice: Model<ScNotice>
  ) { }
  async create(createNoticeDto: CreateNoticeDto) {
    const preSave = new this.sc_notice(createNoticeDto);
    const saveResult = await preSave.save();
    return saveResult;
  }

  async findAll() {
    const findResult = await this.sc_notice.find();
    return findResult;
  }

  async findOne(id: string) {
    const findResult = await this.sc_notice.findById({ _id: id });
    return findResult;
  }

  async update(id: string, updateNoticeDto: UpdateNoticeDto) {
    const findResult = await this.sc_notice.findOne({ _id: id })
    if (findResult == null) throw new NotFoundException();

    findResult.title = updateNoticeDto.title;
    findResult.content = updateNoticeDto.content;

    const saveResult = await findResult.save();

    return saveResult;
  }

  async remove(id: string) {
    const updateResult = await this.sc_notice.findOneAndUpdate({ _id: id }, { isDel: true });
    return updateResult;
    
  }
}
