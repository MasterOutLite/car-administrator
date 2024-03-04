import {Body, Controller, Get, HttpStatus, Post, UseGuards} from '@nestjs/common';
import {ApiBearerAuth, ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {CreateMarkDto} from "./dto/create-mark.dto";
import {MarkService} from "./mark.service";
import {ResponseMarkDto} from "./dto/response-mark.dto";
import {Roles} from "@src/guards/role-guard/roles.decorator";
import {Role} from "@src/const/Role";
import {RolesGuard} from "@src/guards/role-guard/roles.guard";

@Controller('mark')
@ApiTags("Mark")
export class MarkController {
  constructor(private service: MarkService) {
  }

  @Post()
  @Roles([Role.Admin])
  @UseGuards(RolesGuard)
  @ApiBearerAuth()
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
