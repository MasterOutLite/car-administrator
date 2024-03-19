import {create} from "zustand";
import {persist} from "zustand/middleware";
import {jwtDecode} from "jwt-decode";

type State = {
  token: string | null;
  user: { id: number, login: string, role: string[] } | null;
}

type Action = {
  setToken: (token: string) => void;
}

const initState: State = {
  token: null,
  user: null
}

export const useAuthStore = create<State & Action>()(persist((set, get) => ({
  ...initState,
  setToken(token) {
    let user: any = null;
    if (token)
      user = jwtDecode(token) as any;
    set(state => ({token: token, user: user}));

  }
}), {name: 'auth'}))
