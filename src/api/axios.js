import axios from "axios";

export default axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const privateAxios = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
    authorization: `Bearer ${localStorage.getItem("token") || ""}`,
  },
  //   transformRequest: [
  //     (data) => {
  //       return JSON.stringify({
  //         ...{ storeId: +import.meta.env.VITE_STORE_ID },
  //         ...data,
  //       });
  //     },
  //     ...axios.defaults.transformRequest,
  //   ],
});

export const imageApi = axios.create({
  baseURL: "https://api.imgbb.com/1/",
  headers: {
    "Content-Type": "multipart/form-data",
  },
  params: {
    key: "73d87ec05960039ef2e450c3ace2287b",
  },
});
