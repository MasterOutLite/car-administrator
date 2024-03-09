import ApiService from "./api-service";
import {useAuthStore} from "../store/useAuthStore";

class AuthService {

  async login(login: string, password: string) {
    try {
      const res = await ApiService.post('/auth/login', {login, password})
      console.log(res)
      useAuthStore.getState().setToken(res.token);
    } catch (e) {
      console.log(e);
    }
  }
}

export default new AuthService();
