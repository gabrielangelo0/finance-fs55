import axios from "axios";

const instance = axios.create({
  baseURL: 'https://api-financial-production-1881.up.railway.app/',
  timeout: 1000,
  headers: {'X-Custom-Header': 'foobar'}
});

export default instance