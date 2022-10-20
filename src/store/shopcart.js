import { reqCartList, reqDeleteCartByID, reqUpdateCheckedById } from "../api";
const state = {
  carList: [],
};
const mutations = {
  GETCARTLIST(state, carList) {
    state.carList = carList;
  },
};
const actions = {
  //获取购物车裂变信息
  async getCartList({ commit }) {
    let result = await reqCartList();
    if (result.code == 200) {
      commit("GETCARTLIST", result.data);
    }
  },
  //删除购物车商品
  async deleteCartListBySkuID({ commit }, skuId) {
    let result = await reqDeleteCartByID(skuId);
    if (result.code == 200) {
      return "ok";
    } else {
      return Promise.reject(new Error("faile"));
    }
  },
  // 修改购物车某一个商品选中状态
  async updateCheckedById({ commit }, { skuId, isChecked }) {
    let result = await reqUpdateCheckedById(skuId, isChecked);
    if (result.code == 200) {
      return "ok";
    } else {
      return Promise.reject(new Error("faile"));
    }
  },
  //删除全部勾选的商品
  deleteAllCheckedCart({ getters, dispatch }) {
    //context 就是小仓库 commit 【提交mutations修改state】 getters【计算属性】 dispatch【派发action】 state【当前仓库数据】
    //获取购物车全部的数据 是个数组
    let PromiseAll = [];
    getters.carList.cartInfoList.forEach((item) => {
      if (item.isChecked == 1) {
        let promise = dispatch("deleteCartListBySkuID", item.skuId);
        //将每一个返回的Promise添加到数组当中
        PromiseAll.push(promise);
      }
    });
    // 只要全部的
    return Promise.all(PromiseAll);
  },
  //修改全选状态
  updateAllCartIsChecked({ dispatch, state }, isChecked) {
    // console.log(state.carList[0].cartInfoList);
    let promiseAll = [];
    state.carList[0].cartInfoList.forEach((item) => {
      let promise = dispatch("updateCheckedById", {
        skuId: item.skuId,
        isChecked,
      });
      promiseAll.push(promise);
    });
    return Promise.all(promiseAll);
  },
};
const getters = {
  carList(state) {
    return state.carList[0] || {};
  },
};
export default {
  state,
  mutations,
  actions,
  getters,
};
