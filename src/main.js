// 入口文件
import Vue from 'vue'
import App from './App.vue'
// 引入并注册ElementUI组件
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)
// 引入并注册全局组件
import TypeNav from './components/TypeNav'
import Mybanner from './components/MyBanner'
import MyPagination from './components/MyPagination'
Vue.component(TypeNav.name, TypeNav)
Vue.component(Mybanner.name, Mybanner)
Vue.component(MyPagination.name, MyPagination)
// 引入路由模块
import router from './router'
// 引入store模块
import store from './store'
// 引入api请求函数模块
import * as http from './api'
// 引入mock模块让他执行一次
import './mock/mockServe'
// 引入并注册懒加载插件
import loadimage from './assets/lazyload.gif'
import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload, {loading: loadimage})
// 引入swiper样式
import 'swiper/css/swiper.css';
// 关闭生产提升
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  beforeCreate() {
    // 注册全局事件总线
    Vue.prototype.$bus = this
    // 向Vue的原型对象身上挂载api请求函数对象
    Vue.prototype.$http = http
  },
  router,
  store,
}).$mount('#app')
