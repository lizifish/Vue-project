<template>
  <div class="swiper-container" ref="mySwiper">
    <div class="swiper-wrapper">
      <div
        class="swiper-slide" v-for="(carsousel, index) in list" :key="carsousel.id">
        <img :src="carsousel.imgUrl" />
      </div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>

    <!-- 如果需要导航按钮 -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </div>
</template>

<script>
//引入swiper
import Swiper from "swiper";
export default {
  name: "Carsousel",
  props:['list'],
  watch: {
    list: {
      //立即监听：不管数据有没有变化，上来就立即监听一次
      //为什么watch 监听不到list：因为这个数据重来没有发生过变化（数据是父亲给的，父亲给的是时候就是个对象，对象里面该有的数据都是有的）
      immediate: true,
      handler() {
        //只能监听到数据已经有了，v-for 渲染的结构无法确定，还是需要用nextTick
        this.$nextTick(() => {
          var mySwiper = new Swiper(this.$refs.mySwiper, {
            loop: true, // 循环模式选项
            autoplay: {
              delay: 2500,
              disableOnInteraction: false,
            },
            // 如果需要分页器
            pagination: {
              el: ".swiper-pagination",
              dynamicBullets: true,
              clickable: true, //点击小点轮播
            },
            // 如果需要前进后退按钮
            navigation: {
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            },
          });
        });
      },
    },
  },
};
</script>

<style lang="scss" scoped>
</style>