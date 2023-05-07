// 引入请求函数
import { reqGetGoodsDetail } from "@/api"
import { reqAddOrUpdateCart } from "@/api"
// 引入uuid函数生成游客的唯一标识并存到仓库中
import {getUUID} from "@/utils/USER_ID"
export default {
    namespaced: true,
    actions: {
        // 获取商品详情
        async getGoodsDetail({commit}, skuid) {
            let result = await reqGetGoodsDetail(skuid)
            if (result.code === 200) {
                commit('GET_GOODSDETAIL', result.data)
            }
        },
        // 将商品添加到购物车或更新购物车的数据
        async getAddOrUpdateCart(_, params) {
            let result = await reqAddOrUpdateCart(params)
            if (result.code === 200) {
                return 'success'
            } else {
                return Promise.reject()
            }
        }
    },
    mutations: {
        GET_GOODSDETAIL(state, value) {
            state.goodsDetail = value
        }
    },
    state: {
        goodsDetail: {},
        uuid_token: getUUID(),
    },
    getters: {
        categoryView(state) {
            return state.goodsDetail.categoryView || {}
        },
        skuInfo(state) {
            return state.goodsDetail.skuInfo || {}
        },
        spuSaleAttrList(state) {
            return state.goodsDetail.spuSaleAttrList || []
        },
    },
}