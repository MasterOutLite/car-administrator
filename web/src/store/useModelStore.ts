import {create} from "zustand";
import ModelService from "../service/model-service";
import {ModelType} from "../type/model-type";
import {persist} from "zustand/middleware";

type State = {
  model: ModelType[];
  isLoad: boolean;
}

type Action = {
  addModel: (brand: ModelType) => void;
  getModel: () => void;
  getModelAndReload: () => void;
  remove: (id: number) => void;
}

const initState: State = {
  model: [],
  isLoad: false,
}

export const useModelStore = create<State & Action>()(persist((set, get) => ({
  ...initState,
  addModel(model) {
    set({model: [...get().model, model]});
  },
  async getModel() {
    if (get().model.length > 0)
      return;
    console.log("useModelStore", "Load arr model. getModel", get().model)
    await get().getModelAndReload();
  },
  async getModelAndReload() {
    if (get().isLoad)
      return;
    set({isLoad: true})
    const model = await ModelService.get();
    set({model: model || [], isLoad: false})
  },
  remove(id) {
    const newModels = get().model.filter(value => value.id != id);
    set({model: newModels});
  }
}), {
  name: 'useModelStore',
  getStorage: () => sessionStorage,
}));
