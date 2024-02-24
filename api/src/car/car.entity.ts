import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {MarkEntity} from "../mark/mark.entity";
import {ModelEntity} from "../model/model.entity";
import {CarModificationEntity} from "../car-modification/car-modification.entity";

@Entity({name: 'car'})
export class CarEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column('text', {array: true})
  img: string[];

  @ManyToOne(() => MarkEntity, (mark) => mark.marks)
  mark: MarkEntity;

  @ManyToOne(() => ModelEntity, (model) => model.cars)
  model: ModelEntity;

  @OneToMany(() => CarModificationEntity, mod => mod.car)
  carModification: CarModificationEntity[];
}
