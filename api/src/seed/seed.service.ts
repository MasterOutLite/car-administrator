import {Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import RoleEntity from "@src/role/role.entity";
import {Repository} from "typeorm";
import {Role} from "@src/const/Role";
import {UserEntity} from "@src/user/user.entity";

@Injectable()
export class SeedService {

  constructor(@InjectRepository(RoleEntity)
              private repository: Repository<RoleEntity>,
              @InjectRepository(UserEntity)
              private userRepository: Repository<UserEntity>
  ) {
  }

  async seedRole() {
    await this.repository.save([{name: Role.Admin}, {name: Role.User}])
  }

  async seedAdmin() {
    const adminRoles = [{id: 1, name: Role.Admin,}]

    await this.userRepository.save([
      {
        login: 'admin.car.dima',
        password: 'JfdD4Ds225sD',
        roles: adminRoles
      }, {
        login: 'admin.car.vova',
        password: 'JfsdDd48sDD',
        roles: adminRoles
      },
    ]);
  }
}
