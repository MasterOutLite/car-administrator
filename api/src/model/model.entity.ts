import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import CarEntity from "@src/car/car.entity";

@Entity({name: 'model'})
export class ModelEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => CarEntity, (car) => car.model)
  cars: CarEntity[];
}
