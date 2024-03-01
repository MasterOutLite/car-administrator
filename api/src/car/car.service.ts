import {BadRequestException, Injectable, NotFoundException} from '@nestjs/common';
import {DataSource, Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";
import {CreateCarDto} from "./dto/create-car.dto";
import {MarkEntity} from "../mark/mark.entity";
import {ModelEntity} from "../model/model.entity";
import {FilterCarQuery} from "./query/filter-car.query";
import {CarQuery} from "./query/car.query";
import CarEntity from "@src/car/car.entity";
import {FileService} from "@src/file/file.service";
import {FileType} from "@src/file/file-type";

@Injectable()
export class CarService {
  constructor(private dataSource: DataSource,
              @InjectRepository(CarEntity)
              private repository: Repository<CarEntity>,
              @InjectRepository(MarkEntity)
              private repositoryMark: Repository<MarkEntity>,
              @InjectRepository(ModelEntity)
              private repositoryModel: Repository<ModelEntity>,
              private fileService: FileService
  ) {
  }

  async create(dto: CreateCarDto, img: Express.Multer.File[]): Promise<CarEntity> {
    const exists = await this.repository.findOne({where: {name: dto.name}});
    if (exists)
      throw new BadRequestException(`Exists mark with name: ${exists.name}!`);

    const existsMark = await this.repositoryMark.findOne({where: {id: dto.markId}});
    const existsModel = await this.repositoryModel.findOne({where: {id: dto.modelId}});

    if (!existsMark)
      throw new BadRequestException(`MarkId: ${dto.markId} not found!`);

    if (!existsModel)
      throw new BadRequestException(`ModelId: ${dto.modelId} not found!`);

    const saveImg = [];
    for (const data of img) {
      const save = await this.fileService.save(FileType.Pictures, data)
      saveImg.push(save);
    }

    return await this.repository.save({...dto, img: saveImg || []})
  }

  async getAllByFilter(query: FilterCarQuery) {
    return await this.repository.find({where: {...query}});
  }

  async getById(query: CarQuery) {
    const car = await this.repository.findOne({where: {...query}})
    if (!car)
      throw new NotFoundException(`Car by id: ${query.id} not found!`)
    return car;
  }

}
