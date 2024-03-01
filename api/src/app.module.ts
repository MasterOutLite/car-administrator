import {Module} from '@nestjs/common';
import {ConfigModule} from "@nestjs/config";
import {TypeOrmModule} from "@nestjs/typeorm";
import {UserEntity} from "@src/user/user.entity";
import {MarkEntity} from "@src/mark/mark.entity";
import {ModelEntity} from "@src/model/model.entity";
import {CarModificationEntity} from "@src/car-modification/car-modification.entity";
import {UserModule} from "@src/user/user.module";
import {MarkModule} from "@src/mark/mark.module";
import {RoleModule} from "@src/role/role.module";
import {ModelModule} from "@src/model/model.module";
import {CarModule} from "@src/car/car.module";
import {CarModificationModule} from "@src/car-modification/car-modification.module";
import RoleEntity from "@src/role/role.entity";
import CarEntity from "@src/car/car.entity";
import {AuthModule} from './auth/auth.module';
import {JwtModule} from './jwt/jwt.module';
import {FileModule} from './file/file.module';
import {CommandModule} from "nestjs-command";
import {SeedModule} from './seed/seed.module';
import {CommandSeed} from "@src/command-seed";

@Module({
  imports: [
    CommandModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'flora.db.elephantsql.com',
      port: 5432,
      username: 'dxiekezp',
      password: '7oKE3pSzAeFHwwryhQ5eSKQ_DlzgygI5',
      database: 'dxiekezp',
      entities: [UserEntity, RoleEntity, MarkEntity, ModelEntity, CarEntity, CarModificationEntity],
      autoLoadEntities: true,
      synchronize: true,
    }),
    UserModule,
    MarkModule,
    RoleModule,
    ModelModule,
    CarModule,
    CarModificationModule,
    AuthModule,
    JwtModule,
    FileModule,
    SeedModule,
  ],
  exports: [],
  providers: [CommandSeed]
})
export class AppModule {
}
