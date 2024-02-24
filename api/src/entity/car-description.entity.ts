import {Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity({name: 'car-description'})
export class CarDescriptionEntity {
  @PrimaryGeneratedColumn()
  id: number;

}
