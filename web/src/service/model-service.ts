import ApiService from "./api-service";
import {ModelType} from "../type/model-type";
import {IFormCreateModel} from "../component/CreateModel/CreateModel";

class ModelService {

  async get() {
    return await ApiService.get('/model') as ModelType[];
  }

  async create(date: IFormCreateModel) {
    return await ApiService.post('/model', date);
  }
}

export default new ModelService();
