import {Injectable} from '@nestjs/common';
import {MarkEntity} from "./mark.entity";
import {Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";

@Injectable()
export class MarkService {
  constructor(@InjectRepository(MarkEntity)
              private repository: Repository<MarkEntity>) {
  }


}
