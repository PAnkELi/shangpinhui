import requests from "./requests"
import mockRequests from "./mockRequests"

// 请求三级列表数据接口
export const reqCategory = () => {
    //箭头函数可以在程序任意地方使用,箭头函数返回即为服务器的数据
    //下面箭头函数返回值：返回的是什么? promise,即为返回服务器的数据
    //return关键字，千万别忘记书写，如果忘记书写，你在任意地方获取的都是undeinfed
    return requests({ method: 'get', url: '/product/getBaseCategoryList' });
}
// 请求轮播图数据接口
export const reqGetBannerList = () => mockRequests.get('/banner')
// 请求Floor组件中的数据接口
export const reqGetFloorList = () => mockRequests.get('/floor')
// 请求Search路由组件中的数据接口
export const reqGetSearchList = (params) => requests({
    url: '/list',
    method: 'post',
    data: params,
})
// 请求Detail路由组件中的数据接口
export const reqGetGoodsDetail = (params) => requests({url: `/item/${params}`, method: 'get'})
// 将商品加入购物车|将来修改商品个数的接口
export const reqAddOrUpdateCart = ({skuId, skuNum}) => requests({url: `/cart/addToCart/${skuId}/${skuNum}`, method: 'post'})
// 获取购物车数据
export const reqShoppingCartInfo = () => requests({url: '/cart/cartList', method: 'get'})
// 删除购物车中的某一个商品
export const reqDeleteCart = (skuId) => requests({url: `/cart/deleteCart/${skuId}`, method: 'delete'})
// 更新购物车中商品的勾选状态
export const reqCartChecked = ({ skuId, isChecked }) => requests({ url: `/cart/checkCart/${skuId}/${isChecked}`, method: 'get'})
// 获取验证码
export const reqGetCode = (phone) => requests({url: `/user/passport/sendCode/${phone}`, method: 'get'})
// 注册
export const reqRegister = (data) => requests({url: '/user/passport/register', method: 'post', data})
// 登录
export const reqLogin = (data) => requests({url: '/user/passport/login', data, method: 'post'})
// 获取用户信息
export const reqGetUserInfo = () => requests({url: '/user/passport/auth/getUserInfo', method: 'get'})
// 退出登录
export const reqLogout = () => requests({url: '/user/passport/logout', method: 'get'})
// 获取交易页面订单信息
export const reqTradeInfo = () => requests({url: '/order/auth/trade', method: 'get'})
// 获取邮寄地址信息
export const reqAddressInfo = () => mockRequests.get('/address')
// 提交订单获取订单号
export const reqOrderId = ({tradeNo, data}) => requests({url: `order/auth/submitOrder?tradeNo=${tradeNo}`, method: 'post', data})
// 根据订单号获取订单的支付信息
export const reqPayInfo = (orderId) => requests({url: `/payment/weixin/createNative/${orderId}`, method: 'get'})
// 查询订单支付状态
export const reqPayStatus = (orderId) => requests({url: `/payment/weixin/queryPayStatus/${orderId}`, method: 'get'})
// 获取我的订单信息
export const reqOrderInfo = (page, limit) => requests({url: `/order/auth/${page}/${limit}`, method: 'get'})