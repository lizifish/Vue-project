// 配置路由的地方
import Vue from "vue";
import VueRouter from "vue-router";
// 使用路由插件
Vue.use(VueRouter);

//引入routers js
import routes from "./routes";

//先把 VueRouter 原型对象的push 保存一份
//重写 puah || replace

let originPush = VueRouter.prototype.push;
let originReplace = VueRouter.prototype.replace;
//第一个参数：告诉原来的push方法，你往哪里跳转 第二参数是 成功回调 第三个参数 失败回调
VueRouter.prototype.push = function (location, resolve, reject) {
  if (resolve && reject) {
    //csll || apply区别
    // 相同点：都可以调用函数一次，都可以篡改函数的上下文一次
    // 不同点：call与apply传递参数：call传递参数用逗号隔开，apply方法执行，传递数组
    originPush.call(this, location, resolve, reject);
  } else {
    originPush.call(
      this,
      location,
      () => {},
      () => {}
    );
  }
};

VueRouter.prototype.replace = function (location, resolve, reject) {
  if (resolve && reject) {
    originReplace.call(this, location, resolve, reject);
  } else {
    originReplace.call(
      this,
      location,
      () => {},
      () => {}
    );
  }
};

//配置路由 meta: { show: true },判断底部是否展示
export default new VueRouter({
  //配置路由
  routes: routes,
  //滚动行为 y=0代表滚动条在最上方 延迟滚动
  scrollBehavior(to, from, savedPosition) {
    return { y: 0 };
    // return new Promise((resolve, reject) => {
    //   setTimeout(() => {
    //     resolve({ y: 0 });
    //   }, 0);
    // });
  },
});
