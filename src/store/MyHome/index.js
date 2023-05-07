// 引入请求函数
import { reqCategory, reqGetBannerList, reqGetFloorList } from "@/api"

export default {
    namespaced: true,
    actions: {
        // 向服务器请求三级列表数据
        async getCategory({ commit }) {
            //获取服务器的数据,存储在vuex仓库中
            //reqCategory函数执行,返回的是Promise对象【pending、成功、失败】
            //await 等待成功的结果
            let result = await reqCategory()
            //判断服务器返回的状态是200->成功
            if (result.code === 200) {
                //提交mutation存储服务器数据
                commit('GET_CATEGORY', result.data.slice(0,16));
            }
        },
        // 向服务器请求轮播图数据
        async getBannerList({commit}) {
            let result = await reqGetBannerList()
            if (result.code === 200) {
                commit('GET_BANNERLIST', result.data)
            }
        },
        // 向服务器请求Floor组件中的数据
        async getFloorList({commit}) {
            let result = await reqGetFloorList()
            if (result.code === 200) {
                commit('GET_FLOORLIST', result.data)
            }
        }
    },
    mutations: {
        GET_CATEGORY(state, value) {
            state.category = value
        },
        GET_BANNERLIST(state, value) {
            state.bannerList = value
        },
        GET_FLOORLIST(state, value) {
            state.floorList = value
        }
    },
    state: {
        category: [],
        bannerList: [],
        floorList: [],
    },
    getters: {
        
    }
}