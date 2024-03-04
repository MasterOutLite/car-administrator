import ApiService from "./api-service";
import {ModelType} from "../type/model-type";

class ModelService {

  async get() {
    return await ApiService.get('/model') as ModelType[];
  }
}

export default new ModelService();
