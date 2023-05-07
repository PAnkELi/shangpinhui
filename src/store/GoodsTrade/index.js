// 引入请求函数
import { reqTradeInfo, reqAddressInfo } from "@/api";

const actions = {
    // 获取订单页数据
    async getTradeInfo({commit}) {
        let result = await reqTradeInfo()
        if (result.code === 200)
            commit('GET_TRADEINFO', result.data)
    },
    // 获取地址数据
    async getAddressInfo({commit}) {
        let result = await reqAddressInfo()
        if (result.code === 200)
            commit('GET_ADDRESSINFO', result.data.data)
    }
}
const mutations = {
    GET_TRADEINFO(state, value) {
        state.tradeInfo = value
    },
    GET_ADDRESSINFO(state, value) {
        state.addressInfo = value
    }
}
const state = {
    tradeInfo: {},
    addressInfo: {},
}
const getters = {
    // 地址
    addressList(state) {
        return state.addressInfo.userAddressList || []
    },
    // 商品信息
    goodsList(state) {
        return state.tradeInfo.detailArrayList || []
    },
    // 总价
    totalAmount(state) {
        return state.tradeInfo.totalAmount
    },
    // 商品总数
    totalNum(state) {
        return state.tradeInfo.totalNum
    }
}
export default {
    namespaced: true,
    actions,
    mutations,
    state,
    getters,
}