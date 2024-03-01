import {ApiProperty} from "@nestjs/swagger";

export class ResponseMarkDto {

  @ApiProperty({required: true, example: '1'})
  id: number;

  @ApiProperty({required: true, example: 'BMW'})
  name: string;
}
