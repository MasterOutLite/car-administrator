import {Module} from '@nestjs/common';
import {CarModificationService} from './car-modification.service';
import {CarModificationController} from './car-modification.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {CarModificationEntity} from "./car-modification.entity";
import CarEntity from "@src/car/car.entity";
import {AuthModule} from "@src/auth/auth.module";

@Module({
  imports: [AuthModule,TypeOrmModule.forFeature([CarModificationEntity, CarEntity])],
  providers: [CarModificationService],
  controllers: [CarModificationController]
})
export class CarModificationModule {
}
