import {Injectable} from '@nestjs/common';
import {DataSource, Repository} from "typeorm";
import {CarEntity} from "./car.entity";
import {InjectRepository} from "@nestjs/typeorm";

@Injectable()
export class CarService {
  constructor(private dataSource: DataSource,
              @InjectRepository(CarEntity)
              private repository: Repository<CarEntity>) {
  }


}
