import Vue from "vue";
import App from "./App.vue";
//三级联动  全局组件
// 第一个参数：全局组件的名称 第二个参数：哪一个组件
import TypeNav from "@/components/TypeNav";
Vue.component(TypeNav.name, TypeNav);

//引入Swiper公共组件
import Carsousel from "@/components/Carsousel";
Vue.component(Carsousel.name, Carsousel);

//引入分页器组建
import Pagination from "@/components/Pagination";
Vue.component(Pagination.name, Pagination);

//引入路由
import router from "@/router";
//引入仓库
import store from "@/store";
Vue.config.productionTip = false;
//引入 mockSvrve.js --- mock数据
import "@/mock/mockServe.js";
//引入全局swiper样式
import "swiper/css/swiper.css";

//测试接口：
// import { reqGetSearchInfo } from '@/api';
// console.log(reqGetSearchInfo({}))
new Vue({
  render: (h) => h(App),
  //全局事件总线 $bus配置 this就是 VM
  beforeCreate() {
    Vue.prototype.$bus = this;
  },
  //注册路由
  //注册路由信息：组件身上有拥有$route,$router属性
  router,
  //注册仓库
  store,
}).$mount("#app");
