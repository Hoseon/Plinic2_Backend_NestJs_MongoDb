import { PartialType } from '@nestjs/swagger';
import { CreateDevicelogDto } from './create-devicelog.dto';

export class UpdateDevicelogDto extends PartialType(CreateDevicelogDto) {}
