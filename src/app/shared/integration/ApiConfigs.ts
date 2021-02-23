import Axios from 'axios';

export const ApiConfig = Axios.create({
  baseURL: 'http://localhost:3997/',
});
