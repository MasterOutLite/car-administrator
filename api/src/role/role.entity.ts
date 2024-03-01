import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity({name: "role"})
export default class RoleEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}
