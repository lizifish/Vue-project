<template>
  <div class="pagination">
    <!-- <h1>start：{{ startNumAndEndNum.start}},----- end：{{  startNumAndEndNum.end }} --- {{ totalPage }}</h1> -->
    <button :disabled="pageNo == 1" @click="$emit('getPageNo',pageNo - 1)">上一页</button>
    <button v-if="startNumAndEndNum.start > 1" @click="$emit('getPageNo',1)" :class="{active:pageNo == 1}">1</button>
    <button v-if="startNumAndEndNum.start > 2">···</button>

    <!-- 中间 -->
    <button v-for="(page,index) in startNumAndEndNum.end" :key="index" v-if="page >= startNumAndEndNum.start"
      @click="$emit('getPageNo',page)" :class="{active:pageNo == page}">{{ page }}</button>

    <button v-if="startNumAndEndNum.end <totalPage -1">···</button>
    <button v-if="startNumAndEndNum.end < totalPage" @click="$emit('getPageNo',totalPage)" :class="{active:pageNo == totalPage}">{{ totalPage }}</button>
    <button :disabled="pageNo == totalPage" @click="$emit('getPageNo',pageNo + 1)">下一页</button>

    <button style="margin-left: 30px">共 {{ total }}条</button>
  </div>
</template>

<script>
import { computed } from 'vue';
  export default {
    name: "Pagination",
    // 接收父组建传递过来的参数 props
    props:['pageNo','pageSize','total','continues'],
    //计算属性
    computed:{
      //计算一共多少页
      totalPage(){
        // 向上取整
        const { total, pageSize } = this;
        return Math.ceil(total/pageSize);
      },
      //计算连续页码的起始数和结束数
      
      startNumAndEndNum(){
        //解构出来变量
        const { continues, pageNo, totalPage } = this;
        let start = 0, end = 0;
        // 连续页码不够5页
        if(continues > totalPage){
          start = 1;
          end = totalPage;
        }else{
          //开始数字
          start = pageNo - parseInt(continues / 2);
          //结束数字
          end = pageNo + parseInt(continues / 2);
          //判断不正常的现象
          if(start < 1){
            start = 1;
            end = continues;
          };
          if(end > totalPage){
            end = totalPage;
            start = totalPage - continues + 1;
          }
        }
        return {start,end}
      },
    }
  }
</script>

<style lang="less" scoped>
.pagination {
  text-align: center;
  margin: 20px auto;

  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;
    cursor: pointer;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      background-color: #b20fd2;
      color: #fff;
    }
  }
}

</style>