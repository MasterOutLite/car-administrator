import ApiService from "./api-service";
import {BrandType} from "../type/brand-type";

class BrandService {


  async getBrands() {
    return await ApiService.get('/mark') as BrandType[];
  }

}

export default new BrandService();
