//所有的API接口 统一管理
import requests from "./ajax";
import mockRequests from "./mockAjax";
//三级联动接口
//api/product/getBaseCategoryList get  无参数
//发请求:axios发请求返回结果是 Promise 对象
// 箭头函数简化写法 函数写法
export const reqCategoryList = () =>
  requests({ url: "/product/getBaseCategoryList", method: "get" });
//当前函数执行需要把服务器返回结果返回//获取banner
export const reqGetBannerList = () => mockRequests.get("/banner");
//获取floor数据
export const reqFloorList = () => mockRequests.get("/floor");
//获取搜索接口地址：/api/list 方式：post 需要带参数
// 当前这个接口，给服务器传递参数params 至少是一个空对象{}
export const reqGetSearchInfo = (params) =>
  requests({ url: "/list", method: "post", data: params });

//获取商品详情 URL：/api/item/{ skuId } 请求方式：GET
export const reqGoodsInfo = (skuId) =>
  requests({ url: `/item/${skuId}`, method: "get" });

//将商品添加到购物车 /api/cart/addToCart/{ skuId }/{ skuNum }
export const reqAddOrUpdateShopCart = (skuId, skuNum) =>
  requests({ url: `/cart/addToCart/${skuId}/${skuNum}`, method: "post" });

//获取购物车列表接口/api/cart/cartList get
export const reqCartList = () =>
  requests({ url: "/cart/cartList", method: "get" });

// 删除购物车产品的接口
export const reqDeleteCartByID = (skuId) =>
  requests({ url: `/cart/deleteCart/${skuId}`, method: "delete" });

// 修改商品选中状态 /api/cart/checkCart/{skuID}/{isChecked} get
export const reqUpdateCheckedById = (skuId, isChecked) =>
  requests({ url: `/cart/checkCart/${skuId}/${isChecked}`, mothed: "get" });

// 获取验证码 /api/user/passport/sendCode/{phone} get
export const reqGetCode = (phone) =>
  requests({ url: `/user/passport/sendCode/${phone}`, method: "get" });

//注册接口 /api/user/passport/register data:{phone code password}  post
export const reqUserRegister = (user) =>
  requests({ url: "/user/passport/register", user, method: "post" });

//登录接口 /api/user/passport/login post data{phone password}
export const reqUserLogin = (data) =>
  requests({ url: "/user/passport/login", data, method: "post" });

//获取永福信息接口 /api/user/passport/auth/getUserInfo get 需要用户的token校验
export const reqUserInfo = () =>
  requests({ url: "/user/passport/auth/getUserInfo", method: "get" });

// 退出登录接口 /api/user/passport/logout get 没有参数
export const reqLogout = () =>
  requests({ url: "/user/passport/logout", method: "get" });
