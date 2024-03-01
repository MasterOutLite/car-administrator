import {ApiProperty} from "@nestjs/swagger";

export class ResponseCarModificationDto {
  @ApiProperty({example: 1})
  id: number;

  @ApiProperty({example: 1})
  carId: number;

  @ApiProperty({example: 'M135i xDrive (2.0i)'})
  name: string;

  @ApiProperty({example: '306'})
  powerEngin: string;

  @ApiProperty({example: '8-Steptronic'})
  typeTransmission: string;

  @ApiProperty({example: '4x4'})
  wheelDrive: string;
}
