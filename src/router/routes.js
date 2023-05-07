// 引入路由组件
// 一级路由组件
import MyHome from '../pages/MyHome'
import MyLogin from '../pages/MyLogin'
import MySearch from '../pages/MySearch'
import MyRegister from '../pages/MyRegister'
import GoodsDetail from '../pages/GoodsDetail'
import AddCartSuccess from '../pages/AddCartSuccess'
import ShoppingCart from '../pages/ShoppingCart'
import GoodsTrade from '../pages/GoodsTrade'
import OrderPay from '../pages/OrderPay'
import PaySuccess from '../pages/PaySuccess'
import UserCenter from '../pages/UserCenter'
// 二级路由组件
import MyOrder from '../pages/UserCenter/MyOrder'
import GroupOrder from '../pages/UserCenter/GroupOrder'

// 对外暴露路由信息
export default [
    // 重定向
    {
        path: '*',
        redirect: '/home',
    },
    {
        path: '/home',
        component: MyHome,
        // 添加路由元信息 控制footer组件的显示与隐藏
        meta: { footerShow: true, searchShow: true }
    },
    {
        // params占位后面加一个问号 用来表示可传可不传参
        // 这里如果不加这个问号的话路径就会出现问题
        path: '/search/:keyword?',
        component: MySearch,
        name: 'search',
        meta: { footerShow: true, searchShow: true }
    },
    {
        path: '/detail/:skuid?',
        name: 'detail',
        component: GoodsDetail,
        meta: { footerShow: true, searchShow: true }
    },
    {
        path: '/addcartsuccess',
        name: 'addcartsuccess',
        component: AddCartSuccess,
        meta: { footerShow: true, searchShow: false }
    },
    {
        path: '/shoppingcart',
        name: 'shoppingcart',
        component: ShoppingCart,
        meta: { footerShow: true, searchShow: true }
    },
    {
        path: '/login',
        name: 'login',
        component: MyLogin,
        meta: { footerShow: false, searchShow: false }
    },
    {
        path: '/register',
        component: MyRegister,
        meta: { footerShow: false, searchShow: false }
    },
    {
        path: '/trade',
        name: 'trade',
        component: GoodsTrade,
        meta: { footerShow: true, searchShow: false }
    },
    {
        path: '/pay',
        name: 'pay',
        component: OrderPay,
        meta: { footerShow: true, searchShow: false },
        // 路由独享守卫 pay路由只能由trade路由跳转过来
        beforeEnter: (to, from, next) => {
            // 这里不太严谨
            from.name === 'trade' || from.path === '/' || (from.name === 'myorder' && to.query.orderId) ? next() : next('/home')
        }
    },
    {
        path: '/paysuccess',
        name: 'paysuccess',
        component: PaySuccess,
        meta: { footerShow: true, searchShow: false },
        // paysuccess路由只能由pay路由跳转过来
        beforeEnter: (to, from, next) => from.name === 'pay' || from.path === '/' ? next() : next('/home')
    },
    {
        path: '/usercenter',
        name: 'usercenter',
        component: UserCenter,
        meta: { footerShow: true, searchShow: true },
        children: [
            {
                path: '/usercenter',
                redirect: '/usercenter/myorder'
            },
            {
                path: 'myorder',
                name: 'myorder',
                component: MyOrder,
                meta: { footerShow: true, searchShow: true },
            },
            {
                path: 'grouporder',
                name: 'grouporder',
                component: GroupOrder,
                meta: { footerShow: true, searchShow: true },
            },
        ]
    },
]