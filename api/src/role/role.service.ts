import {Injectable} from '@nestjs/common';
import {Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";
import RoleEntity from "@src/role/role.entity";

@Injectable()
export class RoleService {
  constructor(@InjectRepository(RoleEntity)
              private repository: Repository<RoleEntity>) {
  }
}
