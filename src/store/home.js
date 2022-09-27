import { reqCategoryList, reqFloorList, reqGetBannerList } from "@/api";
//创建home 模块的小仓库 先声明一个仓库状态原始
const state = {
  //state 默认初始值 服务器返回是对象 或者数组。state就是对象或者数组
  categoryList: [],
  //轮播图数据
  bannerList: [],
  //floor列表数据
  floorList: [],
};
const mutations = {
  CATEGORYLIST(state, categoryList) {
    state.categoryList = categoryList;
  },
  GETBANNERLIST(state, bannerList) {
    state.bannerList = bannerList;
    console.log('修改仓库中bannerList数据')
  },
  GETFLOORLIST(state, floorList) {
    state.floorList = floorList;
  }
};
const actions = {
  // 通过API里面的接口调用函数，向服务器发请求，获取服务器数据 async $ await 同时使用，调用数据返回成功结果
  async categoryList({ commit }) {
    let result = await reqCategoryList();
    if (result.code == 200) {
      commit("CATEGORYLIST", result.data)
    }
  },

  //获取首页轮播数据
  async getBannerList({ commit }) {
    console.log("在向服务器发ajax请求 获取轮播图的数据")
    let result = await reqGetBannerList();
    if (result.code == 200) {
      commit("GETBANNERLIST", result.data)
    }
  },
  // 获取floor数据
  async getFloorList({ commit }) {
    let result = await reqFloorList();
    if (result.code == 200) {
      commit("GETFLOORLIST", result.data)
    }
  }

};
const getters = {};
export default {
  state,
  mutations,
  actions,
  getters,
}