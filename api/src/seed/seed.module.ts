import {Module} from '@nestjs/common';
import {SeedService} from './seed.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import RoleEntity from "@src/role/role.entity";
import {UserEntity} from "@src/user/user.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([RoleEntity, UserEntity])
  ],
  providers: [SeedService],
  exports: [SeedService]
})
export class SeedModule {
}
