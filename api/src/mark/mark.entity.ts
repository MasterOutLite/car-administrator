import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {CarEntity} from "../car/car.entity";

@Entity({name: "mark"})
export class MarkEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => CarEntity, (car) => car.mark)
  marks: MarkEntity[];
}
