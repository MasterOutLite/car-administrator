import {ApiProperty} from "@nestjs/swagger";
import {IsString} from "class-validator";

export class LoginDto {

  @ApiProperty({example: 'admin41.ds.df'})
  @IsString()
  login: string;

  @ApiProperty({example: 'df55sdeSsd@'})
  @IsString()
  password: string;
}
