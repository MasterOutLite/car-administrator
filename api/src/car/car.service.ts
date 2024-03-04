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
import {UpdateCarDto} from "@src/car/dto/update-car.dto";

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

  async create(dto: CreateCarDto, file: {
    img: Express.Multer.File[],
    icon: Express.Multer.File[],
  }): Promise<CarEntity> {
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
    for (const data of file.img) {
      const save = await this.fileService.save(FileType.Pictures, data)
      saveImg.push(save);
    }

    const saveIcon = await this.fileService.save(FileType.Icon, file.icon[0])

    return await this.repository.save({...dto, img: saveImg, icon: saveIcon})
  }

  async update(id: number, dto: UpdateCarDto, file: {
    img: Express.Multer.File[],
    icon: Express.Multer.File[],
  }) {
    console.log('CarService', 'update', id);
    const car = await this.repository.findOne({
      where: {
        id: id
      }
    });

    const saveImg = [];
    if (Array.isArray(file.img)) {
      for (const data of file.img) {
        const save = await this.fileService.save(FileType.Pictures, data)
        saveImg.push(save);
      }
    }

    car.img.push(...saveImg);
    if (dto.name)
      car.name = dto.name;
    if (dto.description)
      car.description = dto.description;
    if (file.icon && file.icon[0]) {
      car.icon = await this.fileService.save(FileType.Icon, file.icon[0]);
    }

    await this.repository.update(id, car);

    return car;
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
