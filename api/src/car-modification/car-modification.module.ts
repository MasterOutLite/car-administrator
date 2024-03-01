import {Module} from '@nestjs/common';
import {CarModificationService} from './car-modification.service';
import {CarModificationController} from './car-modification.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {CarModificationEntity} from "./car-modification.entity";
import CarEntity from "@src/car/car.entity";

@Module({
  imports: [TypeOrmModule.forFeature([CarModificationEntity, CarEntity])],
  providers: [CarModificationService],
  controllers: [CarModificationController]
})
export class CarModificationModule {
}
