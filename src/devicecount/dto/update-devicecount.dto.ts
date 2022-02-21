import { PartialType } from '@nestjs/swagger';
import { CreateDevicecountDto } from './create-devicecount.dto';

export class UpdateDevicecountDto extends PartialType(CreateDevicecountDto) {}
