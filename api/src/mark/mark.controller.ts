import {Body, Controller, Get, HttpStatus, Post} from '@nestjs/common';
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {CreateMarkDto} from "./dto/create-mark.dto";
import {MarkService} from "./mark.service";
import {ResponseMarkDto} from "./dto/response-mark.dto";

@Controller('mark')
@ApiTags("Mark")
export class MarkController {
  constructor(private service: MarkService) {
  }

  @Post()
  @ApiOperation({summary: 'Create mark'})
  @ApiResponse({status: HttpStatus.CREATED, type: ResponseMarkDto})
  create(@Body() dto: CreateMarkDto) {
    return this.service.create(dto);
  }

  @Get()
  @ApiOperation({summary: 'Get all mark'})
  @ApiResponse({status: HttpStatus.OK, type: [ResponseMarkDto]})
  getAll() {
    return this.service.getAll();
  }

}
