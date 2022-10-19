//小仓库新建完成后一定要在大仓库内合并
import { reqGoodsInfo } from "@/api";
import { reqAddOrUpdateShopCart } from "@/api";

const state = {
  goodsInfo: {},
};
const mutations = {
  GETGOODSINFO(state, goodsInfo) {
    state.goodsInfo = goodsInfo;
  },
};
const actions = {
  // 通过API里面的接口调用函数，向服务器发请求，获取服务器数据 async $ await 同时使用，调用数据返回成功结果
  async getGoodsInfo({ commit }, skuId) {
    let result = await reqGoodsInfo(skuId);
    if (result.code == 200) {
      commit("GETGOODSINFO", result.data);
    }
  },
  //将产品添加到购物车 方法加上async 返回的是一个Promise
  async addOrUpdateShopCart({ commit }, { skuId, skuNum }) {
    //加入购物车返回的解构 发请求以后是前台把参数带给服务器 服务器写入数据成功 返回code = 200 代表成功 不会再返回其他的数据 不需要存储数据
    let result = await reqAddOrUpdateShopCart(skuId, skuNum);
    // console.log(result);
    // 加购成功
    if (result.code == 200) {
      return "success";
    } else {
      // 加购失败
      return Promise.reject(new Error("请求发送失败，请检查参数是否正确"));
    }
  },
};
//简化数组而生
const getters = {
  // 初始值goodsInfo是空对象返回是undefinde 获取的至少是个空对象
  categoryView(state) {
    return state.goodsInfo.categoryView || {};
  },
  //简化商品详情信息的数据
  skuInfo(state) {
    return state.goodsInfo.skuInfo || {};
  },
  //售卖属性的简化
  spuSaleAttrList(state) {
    return state.goodsInfo.spuSaleAttrList || [];
  },
};
export default {
  state,
  mutations,
  actions,
  getters,
};
