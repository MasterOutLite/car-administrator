import { Injectable } from '@nestjs/common';
import {UserEntity} from "./user.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";

@Injectable()
export class UserService {
  constructor( @InjectRepository(UserEntity)
               private repository: Repository<UserEntity>) {
  }
}
