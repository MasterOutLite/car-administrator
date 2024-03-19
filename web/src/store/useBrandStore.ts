import {create} from "zustand";
import {BrandType} from "../type/brand-type";
import BrandService from "../service/brand-service";
import {persist} from "zustand/middleware";

type State = {
  brands: BrandType[];
  isLoad: boolean;
}

type Action = {
  addBrand: (brand: BrandType) => void;
  getBrand: () => void;
  getBrandAndReload: () => void;
}

const initState: State = {
  brands: [],
  isLoad: false,
}

export const useBrandStore = create<State & Action>()(persist((set, get) => ({
  ...initState,
 async addBrand(brand)
 {
    set({brands: [...get().brands, brand]});
  },
  async getBrand() {
    if (get().brands.length > 0)
      return;
    console.log("useBrandStore", "Load arr brand. getBrand", get().brands)
    await get().getBrandAndReload();
  },
  async getBrandAndReload() {
    if (get().isLoad)
      return;
    set({isLoad: true})
    const brands = await BrandService.getBrands();
    set({brands: brands || [], isLoad: false})
  }
}), {
  name: 'useBrandStore'
}));
