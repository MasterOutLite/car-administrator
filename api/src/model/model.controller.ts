import {Body, Controller, Get, HttpStatus, Post, UseGuards} from '@nestjs/common';
import {ModelService} from "./model.service";
import {ApiBearerAuth, ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {CreateModelDto} from "./dto/create-model.dto";
import {ResponseModelDto} from "./dto/response-model.dto";
import {Roles} from "@src/guards/role-guard/roles.decorator";
import {Role} from "@src/const/Role";
import {RolesGuard} from "@src/guards/role-guard/roles.guard";

@Controller('model')
@ApiTags("Model")
export class ModelController {
  constructor(private service: ModelService) {
  }

  @Post()
  @Roles([Role.Admin])
  @UseGuards(RolesGuard)
  @ApiBearerAuth()
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
