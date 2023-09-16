import axios from 'axios'
import {baseApi} from './baseUrl';

export const axiosInstance = axios.create({
  baseURL: baseApi,
  headers: {
    withCredentials: true,
    Accept: "application/json",
  },
});
