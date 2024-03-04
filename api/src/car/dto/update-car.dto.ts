import {ApiProperty} from "@nestjs/swagger";
import {IsString} from "class-validator";

export class UpdateCarDto {
  @ApiProperty({example: 'BMW 1 Series (F40)', required: false})
  @IsString()
  name: string;

  @ApiProperty({
    example: 'BMW 1 Series (БМВ 1 Серии) - хэтчбек класса «C» с передним либо полным приводом. Третье поколение модели под индексом F40 было представлено в мае 2019 года.'
    , required: false
  })
  @IsString()
  description: string;

  @ApiProperty({description: 'Pictures files', format: 'binary', required: false})
  img: string[];

  @ApiProperty({description: 'Pictures files', format: 'binary', required: false})
  icon: string;
}
