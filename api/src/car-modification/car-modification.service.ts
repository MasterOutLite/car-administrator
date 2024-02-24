import {Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {CarModificationEntity} from "./car-modification.entity";

@Injectable()
export class CarModificationService {
  @InjectRepository(CarModificationEntity)
  private repository: Repository<CarModificationEntity>
}
