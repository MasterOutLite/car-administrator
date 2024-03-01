import {Body, Controller, Get, HttpStatus, Post} from '@nestjs/common';
import {ModelService} from "./model.service";
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {CreateModelDto} from "./dto/create-model.dto";
import {ResponseModelDto} from "./dto/response-model.dto";

@Controller('model')
@ApiTags("Model")
export class ModelController {
  constructor(private service: ModelService) {
  }

  @Post()
  @ApiOperation({summary: 'Create model'})
  @ApiResponse({status: HttpStatus.CREATED, type: ResponseModelDto})
  create(@Body() dto: CreateModelDto) {
    return this.service.create(dto);
  }

  @Get()
  @ApiOperation({summary: 'Get all model'})
  @ApiResponse({status: HttpStatus.CREATED, type: [ResponseModelDto]})
  getAll() {
    return this.service.getAll();
  }


}
