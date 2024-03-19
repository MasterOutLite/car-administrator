import {EditCarModification} from "../type/car-modification";
import ApiService from "./api-service";

class CarModificationService {

  async createCarModification(date: {
    carId: number;
    name: string;
    powerEngin: string;
    typeTransmission: string;
    wheelDrive: string;
  }) {
    return await ApiService.post('/car-modification', date);
  }

  async editCarModification(id: number, modification: EditCarModification) {
    return await ApiService.put(`/car-modification/${id}`, modification)
  }

  async deleteCarModification(id: number,) {
    return await ApiService.delete(`/car-modification/${id}`,);
  }
}

export default new CarModificationService();
