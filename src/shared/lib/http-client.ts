import axios from "axios";
import { sleep } from "./utils";

export const httpClient = axios.create({
  baseURL: "http://localhost:3000",
});

httpClient.interceptors.response.use(async (config) => {
  await sleep(1000);
  return config;
});
