// 对于axios 进行二次封装
import axios from "axios";
//引入进度条
import nprogress from "nprogress";
import "nprogress/nprogress.css";
//引入store模块
import store from "../store";
//start方法: 进度条开始 done方法：代表进度条结束
//1:利用axios对象定的方法create，去创建一个axios实例
//2:requests就是axios，需要配置一下
const requests = axios.create({
  //配置对象
  //基础路径
  baseURL: "/api",
  //请求超时的时间5s
  timeout: 5000,
});
//请求拦截器：在发请求之前，请求拦截器可以检测到，可以在请求发出去之前做一些事情
requests.interceptors.request.use((config) => {
  //config:配置对象，对象里面有一个属性很重要，headers 请求头
  //进度条开始动
  if (store.state.detail.uuid_token) {
    //请求头添加一个字段(userTempID) 必须和后端确认一下
    config.headers.userTempID = store.state.detail.uuid_token;
  }
  nprogress.start();
  return config;
});

//响应拦截器
requests.interceptors.response.use(
  (res) => {
    //  成功的回调函数：服务器相应数据回来以后，响应拦截器可以检测到，可以做一些事情
    //进度条结束
    nprogress.done();
    return res.data;
  },
  (error) => {
    // 响应失败的回调函数
    return Promise.reject(new Error("false"));
  }
);

export default requests;
