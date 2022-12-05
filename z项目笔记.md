1:vue-cli 脚手架初始项目
node + webpack
node_modules 文件夹：项目依赖文件夹
public 放置静态文件

src 文件夹（源代码文件夹）
assets:一般放置的是静态资源（一般是多个组件公用的资源）在 webpack 打包时，webpack 会把静态资源当作一个模块，打包到 js 文件中
components：一般放置的是非路由组件
App.vue:唯一的根组建

2,1,项目运行起来的时候，让浏览器自动打开

"scripts": {
"serve": "vue-cli-service serve --open",
"build": "vue-cli-service build",
"lint": "vue-cli-service lint"
},

eslint 校验功能的关闭
---- 在根目录下创建一个 vue.config.js 文件

src 文件夹简写别名，配置别名 @代表 src 文件夹
{
"compilerOptions": {
"baseUrl": "./",
"paths": {
"@/_": [
"src/_"
]
}
},
"exclude": [
"node_modules",
"dist"
]
}

3,项目路由的分析
vue-router

路由组件：
Home 首页路由组件，Search 路由组件。Login 登录路由组件，Register 注册
非路由组件：
Header[首页 搜索页有]，
Footer[首页 搜索页有，登录页,注册没有]

4, 完成非路由组件 Header 和 Footer 业务
不再以 HTML CSS 为主了 主要搞业务逻辑
1，书写静态的页面（HTML CSS）
2，拆分组件
3，获取服务器的数据动态展示；
4，完成相应的动态组件业务逻辑

注意 1：创建组建时，组件结构 + 组件样式 + 图片资源
注意 2:样式采用 less 样式，安装 less less-loader[安装 5 版本]
npm install less less-loader@5

注意 3:需要在 style 标签加上 lang=less

5，路由组件的搭建：Home, Search, Login, Register

-components：非路由组件
-pages/views 文件夹：放置路由组件

配置路由：一般放在 router 文件夹中
路由组件在 router 文件中进行注册（即为组件名称）

$route :获取路由信息【路径等】
$router:编程式导航跳转

路由的跳转：
声明式导航：router-link
编程时导航：push|replace(还可以做一些其他的业务逻辑)

6，footer 组件：v-if v-show
home search 显示
在 login register 隐藏

可以根据组件上的 $route 获取当前路由信息，通过路由路径判断 Footer 显示与隐藏

配置路由的时候 可以添加路由元信息【meta】字段

路由的传参数

声明式导航：router-link(务必有 to 属性)
编程式导航：利用的是组件实例的 $router.push | replace 方法，可以实现路由的跳转（可以书写一些自己的业务）

路由传参

params 参数：属于路径当中的一部分，需要注意 在配置路由的时候需要占位
query 参数：不属于路径中的一部分，类似于 ajax 中的 queryString /home?k=v &kv=,不需要占位

路由传参面试题：
1,路由传递参数（对象写法）path 是否可以结合 params 参数一起使用？
答：路由跳转传参的时候。对象的写法可以是 name path 形式，但需要注意的是，path 这种写法不能与 parms 参数一起使用

2,如何指定 params 参数可传可不传？
配置路由的时候 占位了（params 参数），但是路由跳转的时候不传递
路径会出现问题
如何指定 params 可传可不传，在配置路由占位的后面加一个问号【 ？ 代表 params 可以传递或者不传递】
this.$router.push({name:'search'},query:{k:this.keyword.toUpperCase()})
答：

3,params 参数可以传递也可以不传第，但是如果传递是空串，如何解决？
params:{keywored:'' || undefined}

4,路由组件能不能传递 props 数据？
可以
布尔值写法：props:true
//布尔值写法：只能传递 params 参数
//props: true
//对象写法
// props: { a: 1, b: 2 }
//函数写法：可以把 params 参数，query 参数，通过 prop 传递给路由组件 箭头函数
props: ($route) => ({ keyword: $route.params.keyword, k: $route.query.k })

1.编程式路由跳转到当前路由（参数不变），多次执行回抛出 NavigationDuplicated 的警告错误？
路由跳转两种形式：声明式导航，编程式导航
（1）通过给 push 方法传递相应的成功，失败的回调函数，可以捕获到当前的错误可以解决
this.$router.push({name:"search",params:{keyword:this.keyword},query:{k:this.keyword.toUpperCase()}},()=>{},()=>{})

this: 当前组件实例（search）
this.$router属性：当前的这个属性，属性值VueRouter类的一个实例，是在入口文件注册路由的时候，给组件实例添加的$router $router 属性
push：VueRouter 类的一个实例

function VueRouter(){

}
//原型对象的方法
VueRouter.prototype.push = function(){
//函数上下文为 VueRouter 类的一个实例
}

let $router = new VueRouter();

$router.push(XXXX)

2,Home 模块组件拆分
--静态页面完成
--拆分出静态组件
--获取服务器的数据进行展示
--动态业务

postman 测试接口：
接口前缀都有/api
code 200 是接口返回成功

6，axios 为什么要二次封装 axios
请求拦截器：可以在发请求之前处理一些业务
响应拦截器：当服务器返回数据以后可以处理一些事情
baseUrl:"/api"

7，接口统一管理

跨越问题：
什么事跨域：协议，域名，端口号不同的请求，称之为跨域
JSONP CROS 代理

8，进度条的使用 nprogress
start:进度条开始
done:进度条结束
可以修改颜色 样式

9 vuex 状态管理器
vuex 是什么：是官方提供的一个插件，状态管理库 集中式管理项目中的组件共用的数据
state
mutations
actions
getters
modules

vuex 基本使用

演示卡顿现象
正常：事件的触发非常频繁。而且每一次额度触发，回调函数都要去执行（如果时间很短，而回调函数内部有计算，那么很有可能出现浏览器卡顿）

函数的节流与防抖：

节流：在规定的时间间隔范围内不会重复触发回调，只有大于这个时间间隔才会触发回调，把频繁触发变为少量触发

防抖：前面的所有的触发都被取消，最后一次执行在规定的时间之后才会触发，也就是说如果连续快速的触发 只会执行一下
lodash 插件：里面封装函数的防抖与节流的业务【闭包加延迟器】

三级联动跳转传参

路由跳转：
声明式导航：router-link （多的话出现卡顿）
编程式导航：push ｜ replace

自定义属性很重要很重要 特别重要
:data-categoryId

过度动画：前提组件｜元素务必要有 v-if ｜ v-show 指令才可以进行过渡动画

search 合并参数

home 首页
mock(模拟数据) 需要插件 mockjs
1,在项目当中的 src 文件夹中创建 mock 文件夹
2，准备 json 数据（在 mock 文件中创建响应的 JSON 文件）-- 格式化一下（有空格跑不起来）
3，把 mock 数据需要的静态图片放置到 public 文件夹中【public 打包时会把相应的资源文件打包到 dist 文件夹中】
4,创建 mockServe.js 通过 mockjs 插件实现模拟数据
5，mockServe.js 在入口文件中引入（至少需要执行一次 才能模拟数据）

解决 swiper 页面加载不完
wacth + nextTick 方法
$nextTick:在下次DOM更新 循环结束之后 执行延迟回调。在 修改数据之后 立即使用很糟糕方法，获取更新后的 DOM。
$nextTick:可以保证页面中的结构一定是有的，经常和很多插件一起使用【都需要 DOM 已经存在了】
使用 ref="mySwiper" 获取 demo 节点 this.$refs.mySwiper
floor 组件：
v-for:可以在自定义标签使用
通信方式：
props：用于父子组件通信
自定义事件：@on @emit 可以实现子给父通信
$bus 全局事件总线 全能

切记：以后在开发项目的时候，如果看到某一个组件在很多地方都使用，要把他贬为全局组件
注册一次，可以在任意地方使用，共用的组件｜非路由组件放到 components 文件夹中

页面开发流程
1:静态页面 + 静态组件拆分
2:发请求（API）
3:Vux（三连环）
4:组件获取仓库数据，动态数据展示

getters 简化仓库中的数组

动态展示面包屑分类名》编程式导航路由跳转【自己跳自己】
动态展示面包屑中的关键字》兄弟组件的通信
组件通信：
props：父子通信
自定义时间：子向父
vuex：万能
插槽：父子
$bus:全局事件总线兄弟直接的通信 $emit $on

排序方式
1: 综合,2: 价格 asc: 升序,desc: 降序  
示例: "1:desc"

为什么要用分页
同时展示的数据很多 必须用分页展示
ElementUI

pageNo:当前第几个
pageSize:代表每一页展示多少数据；
total：代表整个分页器一共展示多少数据；
continues:代表分页连续页码个数

v-for:数组 对象 数字

商品详情页面
1，静态页面；注册为路由组建 滚动行为
2，发请求；API--请求接口
3，vuex
4，动态展示组建

商品跳转需要传参 params 参数

分页器
当前第几页：pageNo
一页展示多少数据：total
每一个展示数据个数：pageSize
连续的页码数：continues

修改产品个数「函数节流」
加入购物车：
UUID：点击加入购物车的时候 通过请求头给服务器带临时身份给服务器 存储某一个用户的购物车数据
会话存储
本地存储
购物车功能 加减数量 函数节流 输入商品数量
删除商品 产品的勾选状态切换
防抖 节流 存储

登陆 注册(git)：必须的技能

assets 文件夹：放置全部组件共用的静态资源
在样式中 引入文件 ～@/images

获取验证码的接口地址
/api/user/passport/sendCode/{phone} get

用户注册完成 登录【token】持久化存储 token
localStorage.setItem("TOKEN",token)
localStorage.getItem("TOKEN")

导航守卫：
用户已经登录，不能再回到登录页
