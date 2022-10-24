//登录 注册模块接口
import { reqGetCode, reqUserRegister, reqUserLogin, reqUserInfo } from "@/api";
import { setToken, getToken } from "@/utils/token";
const state = {
  code: "",
  token: getToken(),
  userInfo: {},
};
const mutations = {
  // 修改state
  GETCODE(state, code) {
    state.code = code;
  },
  //存储用户token
  USERLOGIN(state, token) {
    state.token = token;
  },
  //获取用户信息
  GETUSERINFO(state, userInfo) {
    state.userInfo = userInfo;
  },
};
const actions = {
  //获取验证码
  async getCode({ commit }, phone) {
    let result = await reqGetCode(phone);
    if (result.code == 200) {
      commit("GETCODE", result.data);
      return "ok";
    } else {
      return Promise.reject(new Error("faile"));
    }
  },
  // 用户注册
  async userRegister({ commit }, user) {
    let result = await reqUserRegister(user);
    // console.log(result);
    if (result.code == 200) {
      return "ok";
    } else {
      return Promise.reject(new Error("faile"));
    }
  },
  // 用户登录 user --用户名,密码 {phone password}
  async userLogin({ commit }, user) {
    let result = await reqUserLogin(user);
    //服务器下发的token 用户唯一标识 需要使用token向服务要信息进行展示
    if (result.code == 200) {
      // 获取到了token
      commit("USERLOGIN", result.data.token);
      // 持久化存储token
      setToken(result.data.token);
      return "ok";
    } else {
      return Promise.reject(new Error("faile"));
    }
  },
  //获取用户信息
  async getUserInfo({ commit }) {
    let result = await reqUserInfo();
    if (result.code == 200) {
      commit("GETUSERINFO", result.data);
      return "ok";
    } else {
      return Promise.reject(new Error("faile"));
    }
  },
};
const getters = {};
export default {
  state,
  mutations,
  actions,
  getters,
};
