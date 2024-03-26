import axios from "axios";
import {showMyLoader, unMountedLoader} from "@/hooks/myLoader";

const request = axios.create({
    baseURL: 'http://localhost:9091',
    timeout: 100000, //100s
})

// request拦截器
request.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token')
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        showMyLoader()
        console.log("经过了request拦截器")
        return config
    },
    (error) => Promise.reject(error),
)

// response拦截器,在.then之前，在.then之前，在.then之前
request.interceptors.response.use(
    (response) => {
        unMountedLoader()
        console.log("经过了response拦截器")
        return response //response返回给.then()，其实可以在这里处理code!=200的情况，但是懒得写了
    },
    (error) => {
        Promise.reject(error)
    }
)

// let loading;
// let loadingCount = 0;
// function start() {
//     loading = ElLoading.service({
//         lock: true,
//         text: 'loading',
//         background: 'rgba(0,0,0,0.7)'
//     })
// }
// function end() {
//     loading.close();
// }
// function showLoading() {
//     if (loadingCount === 0) {
//         start();
//     }
//     loadingCount++
// }
//
// function hideLoading() {
//     loadingCount--;
//     if (loadingCount === 0) {
//         end()
//     }
// }
export default request