import nprogress from "nprogress";
import axios from "axios";
const axiosIns = axios.create({
    // baseURL:"http://182.92.128.115/api",
    baseURL:"/api",
    timeout:8000
})

axiosIns.interceptors.request.use(function (config) {
    //发送请求前
    nprogress.start()
    return config;
});

axiosIns.interceptors.response.use(function (response) {
    //发送请求后,成功
    nprogress.done()
    return response.data;
}, function (error) {
    //发送请求后,失败
    nprogress.done()
    return Promise.reject(error);
});

export default axiosIns