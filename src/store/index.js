//引入Vux 相当于最大的仓库
import Vuex from 'vuex';
//引入vue
import Vue from 'vue';
//使用插件：
Vue.use(Vuex);
//引入home search仓库
import home from './home';
import search from './search';
//需要暴露Vuex.Store类的实例
export default new Vuex.Store({
  modules:{
    //模块：把小仓库进行合并变为大仓库
    home,
    search
  }
})