import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000',
});

api.interceptors.response.use((res) => {
  if (res.status === 200) {
    return res.data;
  }
  return null;
});
export default api;
