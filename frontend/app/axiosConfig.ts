import axios from "axios";

console.log("Backend Url", process.env.NEXT_PUBLIC_BACKEND_BASE_URL);

export const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_BASE_URL,
  withCredentials: true,
});
