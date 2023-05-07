import { reqShoppingCartInfo, reqDeleteCart, reqCartChecked } from "@/api"
export default {
    namespaced: true,
    actions: {
        // 获取购物车中的数据
        async getShoppingCartInfo({commit}) {
            let result = await reqShoppingCartInfo()
            if (result.code === 200) {
                commit('GET_SHOPPINGCART_INFO',result.data)
            }
        },
        // 删除购物车中的某一个商品
        async deleteCart(_, skuId) {
            let result = await reqDeleteCart(skuId)
            if (result.code === 200)
                return 'success'
            else
                return Promise.reject()
        },
        // 更新购物车中商品的勾选状态
        async updateChecked(_, params) {
            let result = await reqCartChecked(params)
            if (result.code === 200)
                return 'success'
            else
                return Promise.reject()
        },
        // 删除购物车中所有已选商品
        async deleteAllChecked({dispatch, getters}) {
            let promiseList = []
            await getters.cartListData.cartInfoList.forEach(element => {
                let promise = element.isChecked === 1 ? dispatch('deleteCart', element.skuId) : ''
                promiseList.push(promise)
            })
            return Promise.all(promiseList)
        },
        // 全选复选框的点击操作
        async updateCheckAll({dispatch, getters}, checked) {
            let promiseList = []
            await getters.cartListData.cartInfoList.forEach(element => {
                let promise = element.isChecked !== checked ? dispatch('updateChecked', {isChecked: checked, skuId: element.skuId}) : ''
                promiseList.push(promise)
            })
            return Promise.all(promiseList)
        }
    },
    mutations: {
        GET_SHOPPINGCART_INFO(state, value) {
            state.cartList = value
        }
    },
    state: {
        cartList: [],
    },
    getters: {
        cartListData(state) {
            return state.cartList[0] || {}
        }
    },
}