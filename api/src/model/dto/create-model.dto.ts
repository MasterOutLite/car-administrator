import {ApiProperty} from "@nestjs/swagger";
import {IsString} from "class-validator";

export class CreateModelDto {
  @ApiProperty({required: true, example: 'BMW Series 1'})
  @IsString({message: 'Name is not string!'})
  name: string;
}
