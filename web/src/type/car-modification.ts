export type CarModification = {
  id: number;
  carId: number;
  name: string;
  powerEngin: string;
  typeTransmission: string;
  wheelDrive: string;
}

export type CreateCarModificationType = {
  name: string;
  powerEngin: string;
  typeTransmission: string;
  wheelDrive: string;
}
