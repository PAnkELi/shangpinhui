// 引入请求函数
import { reqGetCode, reqRegister, reqLogin, reqGetUserInfo, reqLogout } from "@/api"
export default {
    namespaced: true,
    actions: {
        // 获取验证码
        async getCode({commit}, phone) {
            let result = await reqGetCode(phone)
            if (result.code === 200) {
                commit('GET_CODE', result.data)
                return 'success'
            }
            else
                return Promise.reject()
        },
        // 注册
        async toRegister(_, data) {
            let result = await reqRegister(data)
            console.log(result)
            if (result.code === 200)
                return 'success'
            else
                return Promise.reject(new Error(result.message))
        },
        // 登录
        async toLogin({commit}, data) {
            let result = await reqLogin(data)
            if (result.code === 200) {
                commit('TO_LOGIN', result.data.token)
                return 'success'
            } else
                return Promise.reject(new Error(result.message))
        },
        // 获取用户信息
        async getUserInfo(context) {
            let result = await reqGetUserInfo()
            if (result.code === 200) {
                context.commit('GET_USERINFO', result.data)
            } else {
                return Promise.reject(new Error(result.message))
            }
        },
        // 退出登录
        async logout({commit}) {
            let result = await reqLogout()
            if (result.code === 200) {
                commit('LOGOUT')
                return 'success'
            } else {
                return Promise.reject(new Error(result.message))
            }
        }
    },
    mutations: {
        GET_CODE(state, value) {
            state.code = value
        },
        TO_LOGIN(state, value) {
            localStorage.setItem('TOKEN', value)
            state.token = value
        },
        GET_USERINFO(state, value) {
            state.userInfo = value
        },
        LOGOUT(state) {
            state.token = ''
            state.userInfo = {}
            localStorage.removeItem('TOKEN')
        }
    },
    state: {
        code: '',
        token: localStorage.getItem('TOKEN'),
        userInfo: {},
    },
    getters: {
        
    }
}