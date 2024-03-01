import {BadRequestException, Injectable} from '@nestjs/common';
import {ModelEntity} from "./model.entity";
import {Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";
import {CreateModelDto} from "./dto/create-model.dto";

@Injectable()
export class ModelService {
  constructor(@InjectRepository(ModelEntity)
              private repository: Repository<ModelEntity>) {
  }

  async create(dto: CreateModelDto) {
    const exists = await this.repository.findOne({where: {name: dto.name}});
    if (exists)
      throw new BadRequestException(`Exists model with name: ${exists.name}`);

    const model = new ModelEntity()
    model.name = dto.name;
    return await this.repository.save(model);
  }

  async getAll() {
    return await this.repository.find();
  }

}
