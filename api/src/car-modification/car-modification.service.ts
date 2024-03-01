import {BadRequestException, Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {CarModificationEntity} from "./car-modification.entity";
import {CreateCarModificationDto} from "./dto/create-car-modification.dto";
import {CarModificationQuery} from "./query/car-modification.query";
import CarEntity from "@src/car/car.entity";

@Injectable()
export class CarModificationService {
  constructor(@InjectRepository(CarModificationEntity)
              private repository: Repository<CarModificationEntity>,
              @InjectRepository(CarEntity)
              private repositoryCar: Repository<CarEntity>,
  ) {
  }

  async create(dto: CreateCarModificationDto) {
    const exists = await this.repository.exists({where: {name: dto.name, carId: dto.carId}});
    const existsCar = await this.repositoryCar.exists({where: {id: dto.carId}});

    if (exists)
      throw new BadRequestException(`Exists car modification with name: ${dto.name}!`);

    if (!existsCar)
      throw new BadRequestException(`Not found car with id: ${dto.carId}!`);

    return await this.repository.save({...dto});
  }

  async getByCar(query: CarModificationQuery) {

    return await this.repository.find({where: {carId: query.carId}})
  }
}
