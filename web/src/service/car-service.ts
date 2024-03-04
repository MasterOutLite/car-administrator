import queryString from "query-string";
import ApiService from "./api-service";
import {CarType} from "../type/car-type";

class CarService {

  async getCars(queryObg?: { markId?: number | null, modelId?: number | null }) {
    const query = queryString.stringify(queryObg || {},
      {arrayFormat: 'comma', skipNull: true, skipEmptyString: true});
    return await ApiService.get('/car/all?' + query) as CarType[];
  }

  async getCar(id: number) {
    return await ApiService.get(`/car/${id}`) as CarType;
  }
}

export default new CarService();
