<template>
  <div>
    <Header></Header>
    <!-- 路由组件出口 -->
    <router-view></router-view>
    <!-- 在Home Search显示 login segister 是隐藏的 -->
    <Footer v-show="$route.meta.show"></Footer>
  </div>
</template>

<script>
import Header from "./components/Header";
import Footer from "./components/Footer";
export default {
  components: {
    Header,
    Footer,
  },
  mounted() {
    //通知vuex发请求，获取数据，存储月仓库当中 派发一个action 获取商品分类的三级列表数组
    //组件实例上才有 #store 属性
    this.$store.dispatch("categoryList");
  },
};
</script>

<style lang="less" scoped>
</style>