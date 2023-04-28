
import axios from "axios";

import { memoizedRefreshToken } from "./refreshToken"; 

axios.defaults.baseURL = "https://projet-09-keep-score-and-have-fun-back.vercel.app/";

axios.interceptors.request.use(
  async (config) => {
    const session = JSON.parse(localStorage.getItem("session"));

    if (session?.token) {
      config.headers = {
        ...config.headers,
        authorization: `Bearer ${session?.token}`,
        
      };
      console.log(config.headers)
    }

    return config;
  },
  (error) => Promise.reject(error)
);

axios.interceptors.response.use(
    (response) => response,
    async (error) => {
      const config = error?.config;
  
      if (error?.response?.status === 401 && !config?.sent) {
        config.sent = true;
  
        const result = await memoizedRefreshToken();
  
        if (result?.accessToken) {
          config.headers = {
            ...config.headers,
            authorization: `Bearer ${result?.accessToken}`,
          };
        }
  
        return axios(config);
      }
      return Promise.reject(error);
    }
  );
  
  export const axiosPrivate = axios;
