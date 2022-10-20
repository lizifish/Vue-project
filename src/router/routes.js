// 引入路由组件
import Home from "@/pages/Home";
import Search from "@/pages/Search";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Detail from "@/pages/Detail";
import AddCartSuccess from "@/pages/AddCartSuccess";
import ShopCart from "@/pages/ShopCart";
//配置路由信息
export default [
  {
    path: "/shopCart",
    name: "shopCart",
    component: ShopCart,
    meta: { show: true },
  },
  {
    path: "/addCartSuccess",
    name: "addCartSuccess",
    component: AddCartSuccess,
    meta: { show: true },
  },
  {
    path: "/detail/:skuId",
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
    props: ($route) => ({
      keyword: $route.params.keyword,
      k: $route.query.k,
    }),
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
];
