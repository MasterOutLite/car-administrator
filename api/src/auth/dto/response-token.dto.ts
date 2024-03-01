import {ApiProperty} from "@nestjs/swagger";

export class ResponseTokenDto {

  @ApiProperty({example: 'token'})
  token: string;
}
