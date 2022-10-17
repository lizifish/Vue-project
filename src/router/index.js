// 配置路由的地方
import Vue from "vue";
import VueRouter from "vue-router";
// 使用路由插件
Vue.use(VueRouter);

// 引入路由组件
import Home from "@/pages/Home";
import Search from "@/pages/Search";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Detail from "@/pages/Detail";

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
  routes: [
    {
      path: "/detail",
      component: Detail,
      meta: { show: true },
    },
    {
      path: "/home",
      component: Home,
      meta: { show: true },
    },
    {
      path: "/search/:keyword?", //？ 是指params 参数可传可不传
      component: Search,
      meta: { show: true },
      name: "search",
      //布尔值写法：只能传递 params 参数
      //props: true
      //对象写法
      // props: { a: 1, b: 2 }
      //函数写法：可以把params参数，query参数，通过prop传递给路由组件 箭头函数
      // props: ($route) => ({ keyword: $route.params.keyword, k: $route.query.k })
    },
    {
      path: "/login",
      component: Login,
      meta: { show: false },
    },
    {
      path: "/register",
      component: Register,
      meta: { show: false },
    },
    {
      //重定向，项目启动时时，访问 /， 定向到首页
      path: "/",
      redirect: "/home",
    },
  ],
});
