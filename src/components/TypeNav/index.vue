<template>
  <div class="type-nav">
    <div class="container">
      <div @mouseenter="enterShow" @mouseleave="leaveHide">
        <h2 class="all">全部商品分类</h2>
        <!-- 三节联动 -->
        <!-- 过渡动画 必须有v-show v-if -->
        <transition name="sort">
          <div class="sort" v-show="show">
            <div class="all-sort-list2" @click="goSearch">
              <div
                class="item"
                v-for="(c1, index) in categoryList"
                :key="c1.categoryId"
                @mouseenter="changeIndex(index)"
                :class="{ cur: currentIndex == index }"
              >
                <h3>
                  <a
                    :data-categoryName="c1.categoryName"
                    :data-category1Id="c1.categoryId"
                    >{{ c1.categoryName }}</a
                  >
                </h3>
                <!-- 二级 三级分类  三元表达式控制显示隐藏-->
                <div
                  class="item-list clearfix"
                  :style="{ display: currentIndex == index ? 'block' : 'none' }"
                >
                  <div
                    class="subitem"
                    v-for="(c2, index) in c1.categoryChild"
                    :key="c2.categoryId"
                  >
                    <dl class="fore">
                      <dt>
                        <a
                          :data-categoryName="c2.categoryName"
                          :data-category2Id="c2.categoryId"
                          >{{ c2.categoryName }}</a
                        >
                      </dt>
                      <dd>
                        <em
                          v-for="(c3, index) in c2.categoryChild"
                          :key="c3.categoryId"
                        >
                          <a
                            :data-categoryName="c3.categoryName"
                            :data-category3Id="c3.categoryId"
                            >{{ c3.categoryName }}</a
                          >
                        </em>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">真快乐超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>

<script>
//利用辅助函数拿到服务器数据
import { mapState } from "vuex";
// 引入方式：是把lodash 全部功能函数引入 最好按需加载
import throttle from "lodash/throttle";
export default {
  name: "TypeNav",
  data() {
    return {
      //存储用户的鼠标移上哪一个一级分类 不能为0  要不默认第一个选中
      currentIndex: -1,
      show: true,
    };
  },
  //组件挂载完毕：向服务器发请求
  mounted() {
    //当组件挂载完毕 show变为false
    if (this.$route.path != "/home") {
      this.show = false;
    }
  },
  computed: {
    //遍历数据
    ...mapState({
      //默认的state方法 对象的写法右侧是一个函数 当使用这个计算属性的时候，右侧函数会立即执行一次
      //注入一个参数state 其实获取大仓库中的数据
      categoryList: (state) => {
        return state.home.categoryList;
      },
    }),
  },
  methods: {
    //一级分类鼠标进入拿到index 节流写法
    // index 鼠标移动某一个一级分类的元素的索引值
    // 正常情况（用户慢慢来的操作）：鼠标进入，每一个一级分类，都会触发鼠标进入事件
    // 非正常：用户快速移动鼠标，只有部分触发
    // 就是由于用户行为过快，导致浏览器反应不过来，如当前回调函数中有一些大量业务，可能出现卡顿现象
    changeIndex: throttle(function (index) {
      this.currentIndex = index;
    }, 50),
    // 进行路由跳转的方法
    goSearch(event) {
      // 编程式导航加上事件的委派
      // 事件的委派 点击a 传响应的参数 name id
      // a 添加自定义属性：data-categoryName
      let element = event.target;
      // 节点中一个dataset属性 可以获取节点的自定义属性与属性值
      let { categoryname, category1id, category2id, category3id } =
        element.dataset;
      if (categoryname) {
        //整理路由跳转
        let location = { name: "search" };
        let query = { categoryName: categoryname };
        if (category1id) {
          query.category1Id = category1id;
        } else if (category2id) {
          query.category2Id = category2id;
        } else {
          query.category3Id = category3id;
        }
        //整理参数 路由拼接到一起 判断路由跳转的时候 如果有params参数 一起传递过去
        if(this.$route.params){
          location.params = this.$route.params;
          location.query = query;
          //路由的跳转 $router
          this.$router.push(location);
        }
      }
    },
    // 在搜索页面鼠标移入显示
    enterShow() {
      if (this.$route.path != "/home") {
        this.show = true;
      }
    },
    //一级分类鼠标移除事件回调
    //鼠标移出隐藏
    leaveHide() {
      this.currentIndex = -1;
      if (this.$route.path != "/home") {
        this.show = false;
      }
    },
  },
};
</script>

<style lang="less" scoped>
.type-nav {
  border-bottom: 2px solid #b20fd2;
  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;
    .all {
      width: 210px;
      height: 45px;
      background-color: #b20fd2;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }
    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }
    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;
      .all-sort-list2 {
        .item {
          h3 {
            line-height: 27px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;
            a {
              color: #333;
            }
          }
          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;
            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;
              dl {
                border-top: 1px solid #eee;
                padding: 3px 0;
                overflow: hidden;
                zoom: 1;
                &.fore {
                  border-top: 0;
                }
                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }
                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;
                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }
          // &:hover {
          //   .item-list {
          //     display: block;
          //   }
          // }
        }
        .cur {
          background: #b20fd2;
        }
        .cur h3 a {
          color: #ffffff;
        }
      }
    }
    //过渡动画的样式
    // 进入的开始动画
    .sort-enter{
      // height: 0px;
      opacity: 0;
    }
    // 过渡动画结束时间
    .sort-enter-to{
      // height: 461px;
      opacity: 1;
    }
    //动画时间 速率
    .sort-enter-active{
      transition: all 1s linear;
    }
  }
}
</style>