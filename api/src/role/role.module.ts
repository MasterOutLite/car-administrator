import { Module } from '@nestjs/common';
import { RoleController } from './role.controller';
import { RoleService } from './role.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import RoleEntity from "@src/role/role.entity";

@Module({
  imports: [TypeOrmModule.forFeature([RoleEntity])],
  controllers: [RoleController],
  providers: [RoleService]
})
export class RoleModule {}
