import {create} from "zustand";
import {persist} from "zustand/middleware";

type State = {
  token: string | null;
}

type Action = {
  setToken: (token: string) => void;
}

const initState: State = {
  token: null
}

export const useAuthStore = create<State & Action>()(persist((set, get) => ({
  ...initState,
  setToken(token) {
    set(state => ({token: token}));
  }
}), {name: 'auth'}))
