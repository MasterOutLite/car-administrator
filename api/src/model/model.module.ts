import { Module } from '@nestjs/common';
import { ModelService } from './model.service';
import { ModelController } from './model.controller';
import {ModelEntity} from "./model.entity";
import {TypeOrmModule} from "@nestjs/typeorm";
import {AuthModule} from "@src/auth/auth.module";

@Module({
  imports: [AuthModule,TypeOrmModule.forFeature([ModelEntity])],
  providers: [ModelService],
  controllers: [ModelController]
})
export class ModelModule {}
