import {ApiProperty} from "@nestjs/swagger";
import {IsDateString, IsNumberString, IsString} from "class-validator";

export class CreateCarDto {

  @ApiProperty({example: 'BMW 1 Series (F40)'})
  @IsString()
  name: string;

  @ApiProperty({example: 'BMW 1 Series (БМВ 1 Серии) - хэтчбек класса «C» с передним либо полным приводом. Третье поколение модели под индексом F40 было представлено в мае 2019 года.'})
  @IsString()
  description: string;

  @ApiProperty({example: '2023-09-09', description: 'Data release.', format: 'Date'})
  @IsDateString()
    //@Transform(({value}) => (new Date(value)))
  yearRelease: Date;

  @ApiProperty({description: 'Pictures files', format: 'binary', required: false})
  img?: string[];

  @ApiProperty({example: 1, description: 'Mark car'})
  @IsNumberString()
  markId: number;

  @ApiProperty({example: 1, description: 'Model car'})
  @IsNumberString()
  modelId: number;
}
