import { PartialType } from '@nestjs/swagger';
import { CreateUnregisterDto } from './create-unregister.dto';

export class UpdateUnregisterDto extends PartialType(CreateUnregisterDto) {}
