import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post, Put,
  Query,
  UploadedFiles,
  UseGuards,
  UseInterceptors
} from '@nestjs/common';
import {ApiBearerAuth, ApiConsumes, ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {CarService} from "./car.service";
import {ResponseCarDto} from "./dto/response-car.dto";
import {CreateCarDto} from "./dto/create-car.dto";
import {FileFieldsInterceptor} from "@nestjs/platform-express";
import {CarQuery} from "./query/car.query";
import {FilterCarQuery} from "./query/filter-car.query";
import {Roles} from "@src/guards/role-guard/roles.decorator";
import {RolesGuard} from "@src/guards/role-guard/roles.guard";
import {Role} from "@src/const/Role";
import {UpdateCarDto} from "@src/car/dto/update-car.dto";

@Controller('car')
@ApiTags("Car")
export class CarController {
  constructor(private service: CarService) {
  }

  @Post()
  @Roles([Role.Admin])
  @UseGuards(RolesGuard)
  @ApiBearerAuth()
  @ApiOperation({summary: 'Create car'})
  @ApiConsumes('multipart/form-data')
  @ApiResponse({status: HttpStatus.CREATED, type: ResponseCarDto})
  @UseInterceptors(FileFieldsInterceptor([
    {name: 'img'},
    {name: 'icon'},
  ]))
  create(@Body() dto: CreateCarDto, @UploadedFiles() files: {
    img: Express.Multer.File[],
    icon: Express.Multer.File[],
  }) {
    return this.service.create(dto, files);
  }


  @Put()
  @Roles([Role.Admin])
  @UseGuards(RolesGuard)
  @ApiBearerAuth()
  @ApiOperation({summary: 'Create car'})
  @ApiConsumes('multipart/form-data')
  @ApiResponse({status: HttpStatus.CREATED, type: ResponseCarDto})
  @UseInterceptors(FileFieldsInterceptor([
    {name: 'img'},
    {name: 'icon'},
  ]))
  update(@Query() query: CarQuery, @Body() dto: UpdateCarDto, @UploadedFiles() files: {
    img: Express.Multer.File[],
    icon: Express.Multer.File[],
  }) {
    return this.service.update(query.id, dto, files);
  }


  @Get()
  @ApiOperation({summary: 'Get one car'})
  @ApiResponse({status: HttpStatus.OK, type: ResponseCarDto})
  getById(@Query() query: CarQuery) {
    return this.service.getById(query);
  }

  @Get("all")
  @ApiOperation({summary: 'Get by filter car'})
  @ApiResponse({status: HttpStatus.OK, type: [ResponseCarDto]})
  getByFilter(@Query() query: FilterCarQuery) {
    return this.service.getAllByFilter(query);
  }
}
