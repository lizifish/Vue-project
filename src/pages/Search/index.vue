<template>
  <div>
    <!-- 商品三级列表 -->
    <TypeNav />
    <div class="main">
      <div class="py-container">
        <!--bread：面包屑，带有 X 的结构-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <!-- 分类面包屑 -->
            <li class="with-x" v-if="searchParams.categoryName">{{ searchParams.categoryName }}<i @click="removeCategorName">×</i></li>
            <!-- 关键字面包屑 -->
            <li class="with-x" v-if="searchParams.keyword">{{ searchParams.keyword }}<i @click="removeKeyword">×</i></li>
            <!-- 品牌的面包屑 -->
            <li class="with-x" v-if="searchParams.trademark">{{ searchParams.trademark.split(":")[1] }}<i @click="removerTrademark">×</i></li>
            <!-- 平台的售卖属性 数组截取 split -->
            <li class="with-x" v-for="(attrValue,index) in searchParams.props" :key="attrValue.index">{{ attrValue.split(":")[1] }}<i @click="removeAttr(index)">×</i></li>
          </ul>
        </div>

        <!--selector 子组件 子给父传递信息 @ 绑定自定义事件-->
        <SearchSelector  @trademarkInfo = "trademarkInfo" @attrInfo="attrInfo"/>

        <!--details 商品详情-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <!-- 排序的结构 -->
              <ul class="sui-nav">
                <!-- 绑定类名添加类名 -->
                <li :class="{active:isOne}" @click="changeOrder('1')">
                  <a>综合 <span v-show="isOne" class="iconfont" :class="{'icon-long-arrow-up':isUp,'icon-long-arrow-down':isDown}"></span></a>
                </li>
                <li :class="{active:isTwo}" @click="changeOrder('2')">
                  <a>价格 <span v-show="isTwo" class="iconfont" :class="{'icon-long-arrow-up':isUp,'icon-long-arrow-down':isDown}"></span></a>
                </li>
              </ul>
            </div>
          </div>
          <!-- 商品列表 -->
          <div class="goods-list">
            <ul class="yui3-g">
              <li
                class="yui3-u-1-5"
                v-for="(goods, index) in goodsList"
                :key="goods.id"
              >
                <div class="list-wrap">
                  <div class="p-img">
                    <a href="item.html" target="_blank"
                      ><img :src="goods.defaultImg"
                    /></a>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>{{ goods.price }}</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a target="_blank" href="item.html" :title="goods.title">{{
                      goods.title
                    }}</a>
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a
                      href="success-cart.html"
                      target="_blank"
                      class="sui-btn btn-bordered btn-danger"
                      >加入购物车</a
                    >
                    <a href="javascript:void(0);" class="sui-btn btn-bordered"
                      >收藏</a
                    >
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <!-- 分页器 -->
          <div class="fr page">
            <div class="sui-pagination clearfix">
              <ul>
                <li class="prev disabled">
                  <a href="#">«上一页</a>
                </li>
                <li class="active">
                  <a href="#">1</a>
                </li>
                <li>
                  <a href="#">2</a>
                </li>
                <li>
                  <a href="#">3</a>
                </li>
                <li>
                  <a href="#">4</a>
                </li>
                <li>
                  <a href="#">5</a>
                </li>
                <li class="dotted"><span>...</span></li>
                <li class="next">
                  <a href="#">下一页»</a>
                </li>
              </ul>
              <div><span>共10页&nbsp;</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import SearchSelector from "./SearchSelector/SearchSelector";
export default {
  // name: "Search",
  components: {
    SearchSelector,
  },
  data() {
    return {
      //带给服务器的参数
      searchParams: {
        category1Id: "",
        category2Id: "",
        category3Id: "",
        //分类的名字
        categoryName: "",
        //绑定的关键字
        keyword: "",
        //排序 初始值
        order: "2:desc",
        //分页器：代表是第几页
        pageNo: 1,
        //每一页展示的数据个数
        pageSize: 10,
        props: [],
        //品牌
        trademark: "",
      },
    };
  },
  //发请求之前 把接口需要传递的参数，进行整理
  beforeMount(){
    // this.searchParams.category3Id = this.$route.query.category3Id;
    // this.searchParams.categoryName = this.$route.query.categoryName;
    //object.assign() 可以把后面的数组与第一个数组进行整合 并返回新的第一个数组
    Object.assign(this.searchParams,this.$route.query,this.$route.params);
    // console.log(this.$route)
  },
  //mounted 组件挂载完毕执行一次【仅仅执行一次】
  mounted() {
    //调用函数
    this.getData();
  },
  //计算属性
  computed: {
    // mapgetters 传递数组
    ...mapGetters(["goodsList"]),
    //判断order返回值 绑定类名
    isOne(){
      return this.searchParams.order.indexOf('1') !== -1;
    },
    isTwo(){
      return this.searchParams.order.indexOf('2') !== -1;
    },
    isUp(){
      return this.searchParams.order.indexOf('asc') !== -1;
    },
    isDown(){
      return this.searchParams.order.indexOf('desc') !==-1;
    }
  },
  //search 页面中会不停的发请求，要把发送请求封装成一个方法进行调用
  methods: {
    getData() {
      this.$store.dispatch("getSearchList", this.searchParams);
    },
    // 删除分类的名字
    removeCategorName(){
      // 清空参数 undefined发请求的时候 参数不会带给服务器了 优化性能
      // 带给服务器的参数可有可无，要是用空的字符串相应的字段还是会带给服务器
      // 把字段变为undefined，这个字段不会带给服务器
      this.searchParams.categoryName = undefined;
      this.searchParams.category1Id = undefined;
      this.searchParams.category2Id = undefined;
      this.searchParams.category3Id = undefined;
      this.getData();
      //需要修改地址栏：进行路由跳转 需要判断是否有params参数 有的话需要带过去
      if(this.$route.params){
        this.$router.push({name:'search',params:this.$route.params})
      }
    },
    // 删除关键字
    removeKeyword(){
      //把searchParams参数中的keyword置空
      this.searchParams.keyword = undefined;
      //再次发请求
      this.getData();
      // 通知兄弟组件 header 清空输入框中的关键字 还有地址栏的params参数 置空
      this.$bus.$emit('clear');
      //进行路由的跳转 判断是否有query参数 有的话要带上
      if(this.$route.query){
        this.$router.push({name:'search',query:this.$route.query})
      }
    },
    //接收子组件传递的信息 自定义事件回调
    trademarkInfo(trademark){
      this.searchParams.trademark = `${trademark.tmId}:${trademark.tmName}`;
      this.getData();
    },
    //删除品牌面包屑数据
    removerTrademark(){
      //将品牌信息置空 再次发请求
      this.searchParams.trademark = undefined;
      this.getData();
    },
    //收集平台售卖属性的回调函数（自定义事件）
    attrInfo(attr,attrValue){
      //整理参数再发送请求 整理参数格式
      let props = `${attr.attrId}:${attrValue}:${attr.attrName}`
      //添加需要传递的参数 数组去重判断这个元素的索引值 在数组中有么有 没有话再push进数组内
      if(this.searchParams.props.indexOf(props) == -1){
        this.searchParams.props.push(props);
      }
      //再次发请求
      this.getData();
    },
    //删除数组中的售卖属性
    removeAttr(index){
      //根据索引值删除数组中的数据 splice(index,1)
      this.searchParams.props.splice(index,1);
      this.getData();
    },
    //筛选方法
    changeOrder(flag){
      //形参 一个标记代表着点击是谁1或者2
      console.log(flag)
    }
  },
  //数据监听：监听组件实例身上属性的属性值变化
  watch:{ 
    // 不需要加this 监听路由的信息是否发生变化
    $route(newValue,oldValue){
      //再次发请求之前整理带给服务器的参数
      Object.assign(this.searchParams,this.$route.query,this.$route.params);
      //再次发axja请求
      this.getData();
      //每一次请求完毕，应该清空三联ID，让下一次的请求不会带上一次的请求
      this.searchParams.category1Id = '';
      this.searchParams.category2Id = '';
      this.searchParams.category3Id = '';
    }
  }
};
</script>

<style lang="less" scoped>
.main {
  margin: 10px 0;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .bread {
      margin-bottom: 5px;
      overflow: hidden;

      .sui-breadcrumb {
        padding: 3px 15px;
        margin: 0;
        font-weight: 400;
        border-radius: 3px;
        float: left;

        li {
          display: inline-block;
          line-height: 18px;

          a {
            color: #666;
            text-decoration: none;

            &:hover {
              color: #4cb9fc;
            }
          }
        }
      }

      .sui-tag {
        margin-top: -5px;
        list-style: none;
        font-size: 0;
        line-height: 0;
        padding: 5px 0 0;
        margin-bottom: 18px;
        float: left;

        .with-x {
          font-size: 12px;
          margin: 0 5px 5px 0;
          display: inline-block;
          overflow: hidden;
          color: #ffffff;
          background: #b20fd2;
          padding: 0 7px;
          height: 20px;
          line-height: 20px;
          border: 1px solid #dedede;
          white-space: nowrap;
          transition: color 400ms;
          cursor: pointer;

          i {
            margin-left: 10px;
            cursor: pointer;
            font: 400 14px tahoma;
            display: inline-block;
            height: 100%;
            vertical-align: middle;
          }

          &:hover {
            // color: #b20fd2;
            // background: #ffffff;
          }
        }
      }
    }

    .details {
      margin-bottom: 5px;

      .sui-navbar {
        overflow: visible;
        margin-bottom: 0;

        .filter {
          min-height: 40px;
          padding-right: 20px;
          background: #fbfbfb;
          border: 1px solid #e2e2e2;
          padding-left: 0;
          border-radius: 0;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

          .sui-nav {
            position: relative;
            left: 0;
            display: block;
            float: left;
            margin: 0 10px 0 0;

            li {
              float: left;
              line-height: 18px;

              a {
                display: block;
                cursor: pointer;
                padding: 11px 15px;
                color: #777;
                text-decoration: none;
              }

              &.active {
                a {
                  background: #b20fd2;
                  color: #fff;
                }
              }
            }
          }
        }
      }

      .goods-list {
        margin: 20px 0;

        ul {
          display: flex;
          flex-wrap: wrap;

          li {
            height: 100%;
            width: 20%;
            margin-top: 10px;
            line-height: 28px;

            .list-wrap {
              .p-img {
                padding-left: 15px;
                width: 215px;
                height: 255px;

                a {
                  color: #666;

                  img {
                    max-width: 100%;
                    height: auto;
                    vertical-align: middle;
                  }
                }
              }

              .price {
                padding-left: 15px;
                font-size: 18px;
                color: #c81623;

                strong {
                  font-weight: 700;

                  i {
                    margin-left: 0px;
                  }
                }
              }

              .attr {
                padding-left: 15px;
                width: 85%;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;

                a {
                  color: #333;
                  text-decoration: none;
                }
              }

              .commit {
                padding-left: 15px;
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;

                span {
                  font-weight: 700;
                  color: #646fb0;
                }
              }

              .operate {
                padding: 12px 15px;

                .sui-btn {
                  display: inline-block;
                  padding: 2px 14px;
                  box-sizing: border-box;
                  margin-bottom: 0;
                  font-size: 12px;
                  line-height: 18px;
                  text-align: center;
                  vertical-align: middle;
                  cursor: pointer;
                  border-radius: 0;
                  background-color: transparent;
                  margin-right: 15px;
                }

                .btn-bordered {
                  min-width: 85px;
                  background-color: transparent;
                  border: 1px solid #8c8c8c;
                  color: #8c8c8c;

                  &:hover {
                    border: 1px solid #666;
                    color: #fff !important;
                    background-color: #666;
                    text-decoration: none;
                  }
                }

                .btn-danger {
                  border: 1px solid #e1251b;
                  color: #e1251b;

                  &:hover {
                    border: 1px solid #e1251b;
                    background-color: #e1251b;
                    color: white !important;
                    text-decoration: none;
                  }
                }
              }
            }
          }
        }
      }

      .page {
        width: 733px;
        height: 66px;
        overflow: hidden;
        float: right;

        .sui-pagination {
          margin: 18px 0;

          ul {
            margin-left: 0;
            margin-bottom: 0;
            vertical-align: middle;
            width: 490px;
            float: left;

            li {
              line-height: 18px;
              display: inline-block;

              a {
                position: relative;
                float: left;
                line-height: 18px;
                text-decoration: none;
                background-color: #fff;
                border: 1px solid #e0e9ee;
                margin-left: -1px;
                font-size: 14px;
                padding: 9px 18px;
                color: #333;
              }

              &.active {
                a {
                  background-color: #fff;
                  color: #e1251b;
                  border-color: #fff;
                  cursor: default;
                }
              }

              &.prev {
                a {
                  background-color: #fafafa;
                }
              }

              &.disabled {
                a {
                  color: #999;
                  cursor: default;
                }
              }

              &.dotted {
                span {
                  margin-left: -1px;
                  position: relative;
                  float: left;
                  line-height: 18px;
                  text-decoration: none;
                  background-color: #fff;
                  font-size: 14px;
                  border: 0;
                  padding: 9px 18px;
                  color: #333;
                }
              }

              &.next {
                a {
                  background-color: #fafafa;
                }
              }
            }
          }

          div {
            color: #333;
            font-size: 14px;
            float: right;
            width: 241px;
          }
        }
      }
    }
  }
}
</style>