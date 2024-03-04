import {create} from "zustand";
import {CarType} from "../type/car-type";
import CarService from "../service/car-service";

type State = {
  brandId: number | undefined | null,
  modelId: number | undefined | null,
  car: CarType[],
}

type Action = {
  setBrandId: (brandId: number | null | undefined) => void;
  setModelId: (modelId: number | null | undefined) => void;
  init: () => Promise<void>;
}

const initState: State = {
  brandId: undefined,
  modelId: undefined,
  car: [],
}

export const useCarFilterStore = create<State & Action>()((set, get) => ({
  ...initState,
  async setBrandId(brandId: number | undefined | null) {
    set(state => ({brandId}))
    console.log('useCarFilterStore', 'setBrandId', brandId)
    await get().init();
  },
  async setModelId(modelId: number | null | undefined) {
    set(state => ({modelId}))
    await get().init();
  },
  async init() {
    const res = await CarService.getCars({markId: get().brandId, modelId: get().modelId})
    set(state => ({car: res}));
  }
}));
