import {Body, Controller, Get, HttpStatus, Post, Query} from '@nestjs/common';
import {CarModificationService} from "./car-modification.service";
import {CreateCarModificationDto} from "./dto/create-car-modification.dto";
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {ResponseCarModificationDto} from "./dto/response-car-modification.dto";
import {CarModificationQuery} from "./query/car-modification.query";

@Controller('car-modification')
@ApiTags("CarModification")
export class CarModificationController {
  constructor(private service: CarModificationService) {
  }

  @Post()
  @ApiOperation({summary: 'Create CarModification'})
  @ApiResponse({status: HttpStatus.CREATED, type: ResponseCarModificationDto})
  create(@Body() dto: CreateCarModificationDto) {
    return this.service.create(dto);
  }

  @Get()
  @ApiOperation({summary: 'get by filter CarModification'})
  @ApiResponse({status: HttpStatus.CREATED, type: [ResponseCarModificationDto]})
  getByFilter(@Query() query: CarModificationQuery) {
    return this.service.getByCar(query);
  }
}
