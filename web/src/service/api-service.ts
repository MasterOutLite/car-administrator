import {useAuthStore} from "../store/useAuthStore";

const api = process.env.REACT_APP_API_URL;

//const api = 'http://localhost:5000/api';

class ApiService {
  async get(url: string) {
    try {
      const response = await fetch(api + url);
      console.log('ApiService', response.url, response.status, response.body);
      return await response.json();
    } catch (e) {
      console.log(e);
    }
  }

  async post(url: string, body: any,) {
    console.log(JSON.stringify(body));
    try {
      const token = useAuthStore.getState().token;
      const response = await fetch(api + url, {
        method: 'post',
        headers: {
          "Authorization": `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)
      });
      return await response.json();
    } catch (e) {
      console.log(e);
    }

  }

  async postFile(url: string, body: FormData) {
    const token = useAuthStore.getState().token;
    const response = await fetch(api + url, {
      method: 'post',
      headers: {
        "Authorization": `Bearer ${token}`,
      },
      body: body
    });
    return await response.json();
  }

  async putFile(url: string, body: FormData) {
    const token = useAuthStore.getState().token;
    const response = await fetch(api + url, {
      method: 'put',
      headers: {
        "Authorization": `Bearer ${token}`,
      },
      body: body
    });
    return await response.json();
  }

  async put(url: string, body: any,) {
    const token = useAuthStore.getState().token;
    const response = await fetch(api + url, {
      method: 'put',
      headers: {
        "Authorization": `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body)
    });
    return await response.json();
  }

  async delete(url: string) {
    const token = useAuthStore.getState().token;
    const response = await fetch(api + url, {
      method: 'delete',
      headers: {
        "Authorization": `Bearer ${token}`,
      }
    });
    console.log('ApiService', response.url, response.status, response.body);
    // if (response.body)
    //   return await response.json();
  }
}

export default new ApiService();
