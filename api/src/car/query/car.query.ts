import {ApiProperty} from "@nestjs/swagger";
import {IsNumberString} from "class-validator";

export class CarQuery {
  @ApiProperty({example: 1, required: true})
  @IsNumberString()
  id: number;
}
