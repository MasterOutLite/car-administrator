import { Module } from '@nestjs/common';
import { CarModificationService } from './car-modification.service';
import { CarModificationController } from './car-modification.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {CarModificationEntity} from "./car-modification.entity";

@Module({
  imports: [TypeOrmModule.forFeature([CarModificationEntity])],
  providers: [CarModificationService],
  controllers: [CarModificationController]
})
export class CarModificationModule {}
