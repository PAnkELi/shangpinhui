// 引入请求函数
import { reqGetSearchList } from '@/api'

export default {
    namespaced: true,
    actions: {
        async getSearchList({commit}, params={}) {
            let result = await reqGetSearchList(params)
            if (result.code === 200) {
                // 这里要写成一个字符串
                commit('GET_SEARCHLIST', result.data)
            }
        }
    },
    mutations: {
        GET_SEARCHLIST(state, value) {
            state.searchList = value
        }
    },
    state: {
        searchList: {},
    },
    // 配置getters项 使得组件中使用数据更简洁 相当于计算属性 主要用于简化数据
    getters: {
        // 商品属性数据
        attrsList(state) {
            return state.searchList.attrsList || []
        },
        // 商品数据
        goodsList(state) {
            return state.searchList.goodsList || []
        },
        // 品牌数据
        trademarkList(state) {
            return state.searchList.trademarkList || []
        },
        // 商品总数
        total(state) {
            return state.searchList.total
        }
    },
}