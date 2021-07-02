import axios from "axios";
export * from "./request";

export const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL
const axiosInstance: any = axios.create({
  baseURL,
  headers: {
    Accept: "application/json, text/plain, */*",
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export default axiosInstance;
