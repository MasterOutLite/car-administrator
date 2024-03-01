import {ApiProperty} from "@nestjs/swagger";

export class ResponseModelDto {

  @ApiProperty({required: true, example: '1'})
  id: number;

  @ApiProperty({required: true, example: 'BMW Series 1'})
  name: string;
}
