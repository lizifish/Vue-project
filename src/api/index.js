//所有的API接口 统一管理
import requests from './ajax';
import mockRequests from './mockAjax';
//三级联动接口
//api/product/getBaseCategoryList get  无参数
//发请求:axios发请求返回结果是 Promise 对象
// 箭头函数简化写法 函数写法
export const reqCategoryList = () => requests({ url: '/product/getBaseCategoryList', method: 'get' })
//当前函数执行需要把服务器返回结果返回//获取banner
export const reqGetBannerList = () => mockRequests.get('/banner')
//获取floor数据
export const reqFloorList = () => mockRequests.get('/floor')
//获取搜索接口地址：/api/list 方式：post 需要带参数
// 当前这个接口，给服务器传递参数params 至少是一个空对象{}
export const reqGetSearchInfo = (params) => requests({ url: "/list", method: 'post', data: params })