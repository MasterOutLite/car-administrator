import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {ConfigModule} from "@nestjs/config";
import {TypeOrmModule} from "@nestjs/typeorm";
import {DataSource} from "typeorm";
import {UserEntity} from "./user/user.entity";
import {UserModule} from './user/user.module';
import {MarkModule} from './mark/mark.module';
import {RoleModule} from './role/role.module';
import {ModelModule} from './model/model.module';
import {CarModule} from './car/car.module';
import {CarModificationModule} from './car-modification/car-modification.module';
import {RoleEntity} from "./role/role.entity";
import {MarkEntity} from "./mark/mark.entity";
import {ModelEntity} from "./model/model.entity";
import {CarEntity} from "./car/car.entity";
import {CarModificationEntity} from "./car-modification/car-modification.entity";

@Module({
  imports: [ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'root',
      database: 'car',
      entities: [UserEntity, RoleEntity, MarkEntity, ModelEntity, CarEntity, CarModificationEntity],
      autoLoadEntities: true,
      synchronize: true,
    }),
    UserModule,
    MarkModule,
    RoleModule,
    ModelModule,
    CarModule,
    CarModificationModule,],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}
