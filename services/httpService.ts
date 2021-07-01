// @ts-nocheck
import axios from "axios";
export * from "./request";
// import getConfig, { API_URL } from 'next/config';
import { API_URL } from 'next/config'
console.log('API_URL:', API_URL)
// const { publicRuntimeConfig } = getConfig();
// console.log('publicRuntimeConfig:', publicRuntimeConfig)

// export const baseURL = publicRuntimeConfig.backendUrl;
// console.log('baseURL:', baseURL)
// const baseURL =
const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL
const axiosInstance: any = axios.create({
  baseURL,
  headers: {
    Accept: "application/json, text/plain, */*",
    // "Content-Type": "application/json, multipart/form-data",
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export default axiosInstance;
