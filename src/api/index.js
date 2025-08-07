import axios from "axios";

import { store } from "../store";
import { setAuthData } from "../store/Auth";

const API_URL = import.meta.env.VITE_BACKEND_LINK;

let options = {
  baseURL: API_URL,
};
// Interceptors
const axiosClient = axios.create(options);
// Add a request interceptor
// axiosClient.interceptors.request.use(
//   function (config) {
//     if (localStorage.getItem('token')) {
//       config.headers.Authorization = localStorage.getItem('token');
//       config.headers['ngrok-skip-browser-warning'] = true;
//     }
//     return config;
//   },
//   function (error) {
//     return Promise.reject(error);
//   }
// );
axiosClient.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      config.headers["ngrok-skip-browser-warning"] = true;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosClient.interceptors.response.use(
  function (res) {
    return res;
  },
  function (error) {
    if (
      error.response.status === 401 &&
      error.response.data.message !== "Incorrect Password"
    ) {
      localStorage.removeItem("token");
      store.dispatch(
        setAuthData({
          currentUser: null,
        })
      );
    } else if (error.response.status === 422 || error.response.status === 404) {
      return Promise.reject(error);
    }
    return Promise.reject(error);
  }
);

export default axiosClient;
