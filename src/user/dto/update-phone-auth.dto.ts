import { PartialType } from "@nestjs/swagger";
import { PhoneAuthDto } from "./phone-auth.dto";

export class UpdatePhoneAuthDto extends PartialType(PhoneAuthDto) {}