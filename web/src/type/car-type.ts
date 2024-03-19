import {CarModification} from "./car-modification";

export type CarType = {
  id: number;
  name: string;
  description: string;
  yearRelease: string;
  img: string[];
  icon: string;
  markId: number;
  modelId: number;
  carModification?: CarModification[];
}

export type EditCarType = {
  name?: string;
  description?: string;
  yearRelease?: string;
  img?: File[];
  removeImg?: string[];
  icon?: File | null;
  markId?: number;
  modelId?: number;
}
