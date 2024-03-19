import queryString from "query-string";
import ApiService from "./api-service";
import {CarType} from "../type/car-type";
import {IFormCreateCar} from "../component/CreateCar/CreateCar";

class CarService {

  async getCars(queryObg?: { markId?: number | null, modelId?: number | null }) {
    const query = queryString.stringify(queryObg || {},
      {arrayFormat: 'comma', skipNull: true, skipEmptyString: true});
    return await ApiService.get('/car/all?' + query) as CarType[];
  }

  async getCar(id: number | string) {
    return await ApiService.get(`/car?id=${id}`) as CarType;
  }

  async createCar(date: FormData) {
    console.log("CarService.createCar", 'send', date)
    const res = await ApiService.postFile('/car', date);
    console.log(res);
  }

  async createCarWithModification(date: FormData) {
    console.log("CarService.createCar", 'send', date)
    const res = await ApiService.postFile('/car/modification ', date);
    console.log(res);
  }

  async editCar(id: number, date: FormData) {
    const res = await ApiService.putFile(`/car/${id}`, date);
    console.log(res);
  }

  async deleteCar(id: number) {
    const res = await ApiService.delete(`/car/${id}`);
    console.log(res);
  }
}

export default new CarService();
