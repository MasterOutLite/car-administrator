import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {CarEntity} from "../car/car.entity";

@Entity({name: 'car-modification'})
export class CarModificationEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => CarEntity, car => car.carModification)
  car: CarEntity;

  @Column()
  name: string;

  @Column()
  powerEngin: string;

  @Column()
  typeTransmission: string;

  @Column()
  wheelDrive: string;


}
