import {ApiProperty} from "@nestjs/swagger";

export class ResponseCarDto {
  @ApiProperty({example: 1})
  id: number;

  @ApiProperty({example: 'BMW 1 Series (F40) '})
  name: string;

  @ApiProperty({example: ''})
  description: string;

  @ApiProperty({example: '2023-9-9', description: 'Data release.', format: 'Date'})
  yearRelease: Date;

  @ApiProperty({description: 'Pictures files', format: 'binary', required: false})
  img?: string[];

  @ApiProperty({description: 'Icon', format: 'binary', required: false})
  icon?: string;

  @ApiProperty({example: 1, description: 'Mark car'})
  markId: number;

  @ApiProperty({example: 1, description: 'Model car'})
  modelId: number;
}
