<template>
  <header class="header">
    <!-- 头部的第一行 -->
    <div class="top">
      <div class="container">
        <div class="loginList">
          <p>欢迎你来到我的页面！</p>
          <p v-if="!userName">
            <span>请</span>
            <!-- 声明式导航必须要有 to属性 -->
            <router-link to="/login">登录</router-link>
            <router-link to="/register" class="register">免费注册</router-link>
          </p>
          <p v-else>
            <a>{{ userName }}</a>
            <a class="register" @click="logout">退出登录</a>
          </p>
        </div>
        <div class="typeList">
          <a href="###">我的订单</a>
          <a href="###">我的购物车</a>
          <a href="###">我的商品</a>
          <a href="###">真快乐会员</a>
          <a href="###">企业采购</a>
          <a href="###">关注真快乐</a>
          <a href="###">合作招商</a>
          <a href="###">商家后台</a>
        </div>
      </div>
    </div>
    <!--头部第二行 搜索区域-->
    <div class="bottom">
      <h1 class="logoArea">
        <router-link to="/home" class="logo" title="项目logo">
          <img src="./images/logo.png" alt="" />
        </router-link>
      </h1>
      <div class="searchArea">
        <form action="###" class="searchForm">
          <input
            type="text"
            id="autocomplete"
            v-model="keyword"
            class="input-error input-xxlarge"
          />
          <button
            class="sui-btn btn-xlarge btn-danger"
            type="button"
            @click="goSearch"
          >
            搜索
          </button>
        </form>
      </div>
      <div class="shoppingArea">
        <a class="shopping" title="真快乐" href="###" target="_blank">
          我的购物车
        </a>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: "Header",

  data() {
    return {
      keyword: "",
    };
  },
  methods: {
    //按钮回调函数 需要向 search 路由进行跳转
    goSearch() {
      //路由传参
      //1,字符串形式
      // this.$router.push("/search/" + this.keyword + "?k=" +this.keyword.toUpperCase());
      //2，模版字符串
      // this.$router.push(`/search/${this.keyword}?k=${this.keyword.toUpperCase()}`)
      //3,对象的写法 || undefined params参数为空时也能正常显示

      //如果路由当中有query参数 也要带上
      if (this.$route.query) {
        let location = {
          name: "search",
          params: { keyword: this.keyword || undefined },
        };
        location.query = this.$route.query;
        //进行路由跳转  $router
        this.$router.push(location);
      }
    },
    //退出登录 需要发请求 服务器清除token
    //清除项目中的数据【】
    async logout() {
      try {
        //如果退出成功发送请求 并跳转到首页
        await this.$store.dispatch("userLogout");
        //声明式跳转
        this.$router.push("/home");
      } catch (error) {
        alert(error.message);
      }
    },
  },
  // 生命周期开始挂载的时候
  mounted() {
    //通过全局事件总线清除关键字
    this.$bus.$on("clear", () => {
      this.keyword = "";
    });
  },
  //计算属性
  computed: {
    //用户名获取
    userName() {
      return this.$store.state.user.userInfo.name;
    },
  },
};
</script>

<style scoped lang=less>
.header {
  & > .top {
    background-color: #eaeaea;
    height: 30px;
    line-height: 30px;

    .container {
      width: 1200px;
      margin: 0 auto;
      overflow: hidden;

      .loginList {
        float: left;

        p {
          float: left;
          margin-right: 10px;

          .register {
            border-left: 1px solid #b3aeae;
            padding: 0 5px;
            margin-left: 5px;
          }
        }
      }

      .typeList {
        float: right;

        a {
          padding: 0 10px;

          & + a {
            border-left: 1px solid #b3aeae;
          }
        }
      }
    }
  }
  & > .bottom {
    width: 1200px;
    margin: 0 auto;
    overflow: hidden;

    .logoArea {
      float: left;

      .logo {
        img {
          width: 70px;
          margin: 30px 45px;
        }
      }
    }

    .searchArea {
      float: left;
      margin-top: 45px;
      margin-left: 120px;

      .searchForm {
        overflow: hidden;

        input {
          box-sizing: border-box;
          width: 490px;
          height: 32px;
          padding: 0px 4px;
          border: 1px solid #b20fd3;
          float: left;

          &:focus {
            outline: none;
          }
        }

        button {
          height: 32px;
          width: 68px;
          background-color: #b20fd3;
          border: none;
          color: #fff;
          float: left;
          cursor: pointer;

          &:focus {
            outline: none;
          }
        }
      }
    }
    .shoppingArea {
      float: right;
      .shopping {
        height: 133px;
        line-height: 125px;
      }
    }
  }
}
</style>