import {ApiProperty} from "@nestjs/swagger";
import {IsNumber, IsString} from "class-validator";

export class CreateCarModificationDto {

  @ApiProperty({example: 1})
  @IsNumber()
  carId: number;

  @ApiProperty({example: 'M135i xDrive (2.0i)'})
  @IsString()
  name: string;

  @ApiProperty({example: '306'})
  @IsString()
  powerEngin: string;

  @ApiProperty({example: '8-Steptronic'})
  @IsString()
  typeTransmission: string;

  @ApiProperty({example: '4x4'})
  @IsString()
  wheelDrive: string;
}
