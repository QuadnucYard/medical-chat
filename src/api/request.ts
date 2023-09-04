import axios from "axios";
import { Notify } from "quasar";

import { useUserStore } from "@/store/user";
// import Cookies from "js-cookie";

// 创建axios实例
const service = axios.create({
  baseURL: "/api",
  timeout: 10000, // 请求超时时间
  withCredentials: true,
});

// request拦截器
service.interceptors.request.use(
  (config) => {
    const userStore = useUserStore();
    if (userStore.user?.token) {
      config.headers["Authorization"] = userStore.user.token; // 让每个请求携带自定义token
    }
    // config.headers["Content-Type"] = "application/json";
    return config;
  },
  (error) => {
    // Do something with request error
    console.log(error); // for debug
    Promise.reject(error);
  }
);

// response 拦截器
service.interceptors.response.use(
  (response) => {
    const code = response.status;
    if (code < 200 || code > 300) {
      return Promise.reject("error");
    } else {
      return response;
    }
  },
  (error) => {
    console.log(error);
    let code = 0;
    try {
      code = error.response.status;
    } catch (e) {
      if (error.toString().includes("Error: timeout")) {
        Notify.create({ type: "negative", message: "网络请求超时" });
        return Promise.reject(error);
      }
    }
    if (!code) {
      Notify.create({ type: "negative", message: "接口请求失败" });
      return Promise.reject(error);
    }
    if (code === 401) {
      console.log("401 Unauthorized");
      const userStore = useUserStore();
      userStore.logout();
      // location.reload();
      Notify.create({ type: "negative", message: error });
    } else if (code === 403) {
      /* const $router = useRouter();
        $router.push({ path: "/401" }); */
      Notify.create({ type: "negative", message: error });
    } else if (code == 422) {
      // Unprocessable Entity
      Notify.create({ type: "negative", message: error.message });
    } else {
      const errorMsg = error.response.data.message ?? error.response.data.detail;
      Notify.create({ type: "negative", message: errorMsg ?? "Unknown error" });
    }
    return Promise.reject(error);
  }
);

export default service;
