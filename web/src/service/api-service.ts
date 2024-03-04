const api = process.env.REACT_APP_API_URL;

class ApiService {
  async get(url: string) {
    const response = await fetch(api + url);
    console.log('ApiService', response.url, response.status, response.body);
    return await response.json();
  }

  async post(url: string, body: any) {
    const response = await fetch(api + url, {
      method: 'post',
      body: JSON.stringify(body)
    });
    return await response.json();
  }
}

export default new ApiService();
