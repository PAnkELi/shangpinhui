// 引入请求函数
import { reqOrderId } from "@/api"

export default {
    namespaced: true,
    actions: {
        // 向服务器提交订单并获取订单号
        async getOrderId({commit}, params) {
            let result = await reqOrderId(params)
            if (result.code === 200) {
                commit('GET_PAYINFO', result.data)
            }
            else {
                return Promise.reject(new Error(result.message))
            }
        }
    },
    mutations: {
        GET_PAYINFO(state, value) {
            state.orderId = value
        }
    },
    state: {
        orderId: '',
    },
    getters: {

    }
}