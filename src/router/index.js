import Vue from 'vue'
import VueRouter from "vue-router"
// 使用插件
Vue.use(VueRouter)
// 引入路由信息模块
import routes from './routes';
// 引入仓库
import store from '@/store';
// 解决连续跳转到同一个地址的时候报错的问题 重写replace和push方法
//把人家原型对象的push方法进行保存
let originPush = VueRouter.prototype.push;
let originReplace = VueRouter.prototype.replace;
//VueRouter.prototype原型对象添加一个方法
//location:路由跳转相关的信息
VueRouter.prototype.push = function (location, resolve, reject) {
    //当前函数this：即为VueRouter类的实例
    //相当于push方法里面this，是windows【完犊子了】
    //利用人家push方法实现路由跳转，保证push里面this,应该vueRouter类的实例

    //面试:函数apply与call区别?
    //相同的地方:都可以篡改函数里面this
    //不同的地方:apply传递参数 数组  call传递参数 逗号分割

    if (resolve && reject) {
        //代表真:代表着两个形参接受参数【箭头函数】
        originPush.call(this, location, resolve, reject);
    } else {
        originPush.call(this, location, () => { }, () => { });
    }
}

VueRouter.prototype.replace = function (location, resolve, reject) {
    if (resolve && reject) {
        //代表真:代表着两个形参接受参数【箭头函数】
        originReplace.call(this, location, resolve, reject);
    } else {
        originReplace.call(this, location, () => { }, () => { });
    }
}
// 创建VueRouter实例对象
const router = new VueRouter({
    routes,
    // 控制路由切换时的滚动行为
    scrollBehavior() {
        // 始终滚动到顶部
        return { y: 0 }
    }
})
// 创建全局路由前置守卫
router.beforeEach(async (to, from, next) => {
    // 判断用户是否登录了 登录后不能再访问login路由
    if (store.state.userAbout.token) {
        // 判断用户登录后是否非法访问login路由
        if (to.name === 'login') {
            next('/home')
        } else {
            // 判断仓库中是否有userinfo数据 没有则发请求获取后再放行
            if (!store.state.userAbout.userInfo.name) {
                try {
                    await store.dispatch('userAbout/getUserInfo')
                    next()
                } catch (error) {
                    // token失效后重新登录
                    await store.dispatch('userAbout/logout')
                    alert('用户信息失效 请重新登录!')
                    next('/login')
                }
            } else {
                next()
            }
        }
    } else {
        // 未登录 不能访问订单及支付相关页面
        if (to.path.indexOf('/pay') !== -1 || to.path.indexOf('/usercenter') !== -1 || to.path.indexOf('/trade') !== -1) {
            next({ path: '/login', query: {redirect: to.path}})
        } else {
            next()
        }
    }
})


// 对外暴露
export default router