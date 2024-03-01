import {BadRequestException, HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {MarkEntity} from "./mark.entity";
import {Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";
import {CreateMarkDto} from "./dto/create-mark.dto";

@Injectable()
export class MarkService {
  constructor(@InjectRepository(MarkEntity)
              private repository: Repository<MarkEntity>) {
  }

  async create(dto: CreateMarkDto): Promise<MarkEntity> {

    const exists = await this.repository.findOne({where: {name: dto.name}});
    if (exists)
      throw new BadRequestException(`Exists mark with name: ${exists.name}!`);

    return await this.repository.save({...dto})
  }

  async getAll(): Promise<MarkEntity[]> {
    return await this.repository.find();
  }

}
