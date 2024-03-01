import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {MarkEntity} from "../mark/mark.entity";
import {ModelEntity} from "../model/model.entity";
import {CarModificationEntity} from "../car-modification/car-modification.entity";

@Entity({name: 'car'})
export default class CarEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  yearRelease: Date;

  @Column()
  description: string;

  @Column('text', {array: true})
  img: string[];

  @ManyToOne(() => MarkEntity, (mark) => mark.marks)
  mark: MarkEntity;
  @Column({nullable: true})
  markId: number;

  @ManyToOne(() => ModelEntity, (model) => model.cars)
  model: ModelEntity;
  @Column()
  modelId: number;

  @OneToMany(() => CarModificationEntity, mod => mod.car)
  carModification: CarModificationEntity[];
}
