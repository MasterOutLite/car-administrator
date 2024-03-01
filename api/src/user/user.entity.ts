import {Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn,} from "typeorm";
import RoleEntity from "@src/role/role.entity";


@Entity({name: "user"})
export class UserEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  login: string;

  @Column()
  password: string;

  @ManyToMany(() => RoleEntity)
  @JoinTable({name: 'user-role'})
  roles: RoleEntity[];
}
