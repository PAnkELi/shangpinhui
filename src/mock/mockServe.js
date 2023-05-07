// 引入mock模块
import Mock from 'mockjs'
// 引入JSON数据
// JSON 图片 是默认对外暴露的
import banner from './banner.json'
import floor from './floor.json'
import address from './address.json'
// mock数据 第一个参数是请求的url地址 第二个参数为请求的数据
Mock.mock('/mock/banner', {code: 200, data: banner})
Mock.mock('/mock/floor', {code: 200, data: floor})
Mock.mock('/mock/address', {code: 200, data: address})