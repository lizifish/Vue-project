<template>
  <div>
    <!-- 三级联到组件 已经注册为全局组件 不需要在import 引入-->
    <TypeNav></TypeNav>
    <ListContainer></ListContainer>
    <Recommend></Recommend>
    <Rank></Rank>
    <Like></Like>
    <!--  自定义标签也可以使用v-for -->
    <Floor v-for="(floor,index) in floorList" :key="floor.id" :list="floor"></Floor>
    <Brand></Brand>
  </div>
</template>

<script>
//引入三联 全局注册不需要引入
// import TypeNav from './TypeNav/index.vue';
//中间部分
import ListContainer from "@/pages/Home/ListContaier";
//引入今日推荐
import Recommend from "@/pages/Home/Recommend";
//引入排行
import Rank from "@/pages/Home/Rank";
//引入猜你喜欢
import Like from "@/pages/Home/Like";
// 引入楼层
import Floor from "@/pages/Home/Floor";
// 引入商标
import Brand from "@/pages/Home/Brand";
import { mapState } from "vuex";
export default {
  name: "Home",
  components: {
    // TypeNav,
    ListContainer,
    Recommend,
    Rank,
    Like,
    Floor,
    Brand,
  },
  //floor 发送请求
  mounted() {
    //派发action，获取floor组件的数据
    this.$store.dispatch("getFloorList");
  },
  computed: {
    //遍历floor数据
    ...mapState({
      floorList: (state) => state.home.floorList,
    }),
  },
};
</script>

<style lang="less" scoped>
</style>