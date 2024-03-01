import {ApiProperty} from "@nestjs/swagger";
import {IsNumberString, IsOptional} from "class-validator";

export class FilterCarQuery {

  @ApiProperty({example: 1, required: false})
  @IsNumberString()
  @IsOptional()
  markId?: number;

  @ApiProperty({example: 1, required: false})
  @IsNumberString()
  @IsOptional()
  modelId?: number;
}
