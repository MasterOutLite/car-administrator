import {Body, Controller, Get, HttpStatus, Post, Query, UseGuards} from '@nestjs/common';
import {CarModificationService} from "./car-modification.service";
import {CreateCarModificationDto} from "./dto/create-car-modification.dto";
import {ApiBearerAuth, ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {ResponseCarModificationDto} from "./dto/response-car-modification.dto";
import {CarModificationQuery} from "./query/car-modification.query";
import {Roles} from "@src/guards/role-guard/roles.decorator";
import {Role} from "@src/const/Role";
import {RolesGuard} from "@src/guards/role-guard/roles.guard";

@Controller('car-modification')
@ApiTags("CarModification")
export class CarModificationController {
  constructor(private service: CarModificationService) {
  }

  @Post()
  @Roles([Role.Admin])
  @UseGuards(RolesGuard)
  @ApiBearerAuth()
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
