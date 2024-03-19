import ApiService from "./api-service";
import {BrandType} from "../type/brand-type";
import {IFormCreteBrand} from "../component/CreateBrand/CreateBrand";

class BrandService {


  async getBrands() {
    return await ApiService.get('/mark') as BrandType[];
  }

  async create(date: IFormCreteBrand) {
    return await ApiService.post('/mark', date);
  }

  async delete(id: number) {
    return await ApiService.delete(`/mark/${id}`);
  }

}

export default new BrandService();
