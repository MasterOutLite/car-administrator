import {Injectable} from '@nestjs/common';
import {ModelEntity} from "./model.entity";
import {Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";

@Injectable()
export class ModelService {
  constructor(@InjectRepository(ModelEntity)
              private repository: Repository<ModelEntity>) {
  }
}
