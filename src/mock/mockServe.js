// 引入mockjs 模块
import Mock from 'mockjs';
// 引入JSON数据格式
// webpack 默认对外暴露的：图片 JSON数据格式
import banner from './banner.json';
import floor from './floor.json'

//mock 数据
Mock.mock("/mock/banner", {
  code: 200,
  data: banner
});
Mock.mock("/mock/floor", {
  code: 200,
  data: floor
})