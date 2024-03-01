import {ApiProperty} from "@nestjs/swagger";
import {IsString} from "class-validator";

export class CreateMarkDto {

  @ApiProperty({required: true, example: 'BMW'})
  @IsString({message: 'Is not string: name'})
  name: string;
}
