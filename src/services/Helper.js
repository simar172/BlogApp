import axios from "axios";
import { getToken } from "../auth/Index";
export const BASE_URL = "http://localhost:8080";
export const myaxios = axios.create({
  baseURL: BASE_URL,
});
export const paxios = axios.create({
  baseURL: BASE_URL,
});

paxios.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = token ? `Bearer ${token}` : "";
  }
  return config;
});
export const cPost = (comment, uid, pid) => {
  return paxios
    .post(`/comment/create/${uid}/${pid}`, comment)
    .then((resp) => resp.data);
};
