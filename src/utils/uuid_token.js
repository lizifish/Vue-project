import { v4 as uuidv4 } from "uuid";
//要生成一个随机的字符串 每次执行不能发生变化 游客身份持久存储
export const getUUID = () => {
  //先从本地存储中获取uuid（看一下本地存储是否有）
  let uuid_token = localStorage.getItem("UUIDTOKEN");
  //判断有没有
  if (!uuid_token) {
    //没有的话生成临时身份
    uuid_token = uuidv4();
    //然后在存储到本地
    localStorage.setItem("UUIDTOKEN", uuid_token);
  }
  //没有返回值是 undefined
  return uuid_token;
};
