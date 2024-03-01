import {Module} from '@nestjs/common';
import {CarController} from './car.controller';
import {CarService} from './car.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {ModelEntity} from "../model/model.entity";
import {MarkEntity} from "../mark/mark.entity";
import CarEntity from "@src/car/car.entity";
import {AuthModule} from "@src/auth/auth.module";
import {FileService} from "@src/file/file.service";
import {FileModule} from "@src/file/file.module";

@Module({
  imports: [TypeOrmModule.forFeature([CarEntity, ModelEntity, MarkEntity]), AuthModule, FileModule],
  controllers: [CarController],
  providers: [CarService, FileService]
})
export class CarModule {
}
