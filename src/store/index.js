// 引入vue vuex
import Vue from 'vue'
import Vuex from 'vuex'
// 引入模块化文件
import MyHome from './MyHome'
import MySearch from './MySearch'
import GoodsDetail from './GoodsDetail'
import ShoppingCart from './ShoppingCart'
import UserInfo from './UserInfo'
import GoodsTrade from './GoodsTrade'
import OrderPay from './OrderPay'
// 应用插件
Vue.use(Vuex)

// 创建store实例对象并对外暴露
export default new Vuex.Store({
    modules: {
        homeAbout: MyHome,
        searchAbout: MySearch,
        detailAbout: GoodsDetail,
        cartAbout: ShoppingCart,
        userAbout: UserInfo,
        tradeAbout: GoodsTrade,
        payAbout: OrderPay,
    }
})