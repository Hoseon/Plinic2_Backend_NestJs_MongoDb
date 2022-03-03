import { Controller, Get, Param } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { SweettrackerService } from './sweettracker.service';

@ApiTags('스위트래커 API - 배송추적')
@Controller('sweettracker')
export class SweettrackerController {
  constructor(private readonly sweettrackerService: SweettrackerService) { }
  
  @ApiOperation({ summary: '사용자 배송 추적 정보 제공' })
  @Get(':uid/:t_invoice')
  findOne(@Param('uid') uid: string, @Param('t_invoice') t_invoice: string) { 
    return this.sweettrackerService.findOne(uid, t_invoice);
  }
}
