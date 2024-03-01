import {ApiProperty} from "@nestjs/swagger";
import {IsNumber, IsNumberString, IsOptional} from "class-validator";

export class CarModificationQuery {

  @ApiProperty({example: 1, required: false})
  @IsNumberString()
  @IsOptional()
  carId?: number;
}
