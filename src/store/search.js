//创建search 模块的小仓库
import { reqGetSearchInfo } from "@/api";
const state = {
  searchList:{},
};
const mutations = {
  GETSEARCHLIST(state,searchList){
    state.searchList = searchList;
  }
};
const actions = {
  // 获取search模块数据
  async getSearchList({ commit },params={}){
    //当前这个reqGetSearchInfo这个函数在调用获取服务器数据的时候，至少传递一个参数（控对象）
    // params形参：当用户派发action的时候，第二个参数传递过来的，至少是一个空对象
    let result =  await reqGetSearchInfo(params);
    if(result.code == 200){
     commit("GETSEARCHLIST",result.data);
    }
    // console.log(result,'11111')
  }
};
// getters 计算属性 为了简化数据
const getters = {
  //当前形参state,是当前仓库中的state
  goodsList(state){
    // state.searchList.goodsList 服务器的数据回来了 
    // 假如没有网路 state.searchList.goodsList返回undeifund 加空[]以防万一
    return state.searchList.goodsList || [];
  },
  trademarkList(state){
    return state.searchList.trademarkList || [];
  },
  attrsList(state){
    return state.searchList.attrsList || [];
  }
};
export default {
    state,
    mutations,
    actions,
    getters,
}