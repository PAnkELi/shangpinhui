<template>
    <div class="cart">
        <h4>全部商品</h4>
        <div class="cart-main">
            <div class="cart-th">
                <div class="cart-th1">全部</div>
                <div class="cart-th2">商品</div>
                <div class="cart-th3">单价（元）</div>
                <div class="cart-th4">数量</div>
                <div class="cart-th5">小计（元）</div>
                <div class="cart-th6">操作</div>
            </div>
            <div class="cart-body">
                <ul class="cart-list" v-for="item in cartInfoList" :key="item.id">
                    <li class="cart-list-con1">
                        <input type="checkbox" name="chk_list" :checked="item.isChecked" @click="updateChecked($event, item.skuId)">
                    </li>
                    <li class="cart-list-con2">
                        <img :src="item.imgUrl">
                        <div class="item-msg">{{item.skuName}}</div>
                    </li>
                    <li class="cart-list-con4">
                        <span class="price">{{item.skuPrice}}.00</span>
                    </li>
                    <li class="cart-list-con5">
                        <a href="javascript:void(0)" class="mins" @click="minusSkuNum(item)">-</a>
                        <input autocomplete="off" type="text" :value="item.skuNum" minnum="1" class="itxt" @change="changeSkuNum($event, item)">
                        <a href="javascript:void(0)" class="plus" @click="addSkuNum(item.skuId)">+</a>
                    </li>
                    <li class="cart-list-con6">
                        <span class="sum">{{item.skuPrice * item.skuNum}}</span>
                    </li>
                    <li class="cart-list-con7">
                        <a class="sindelet" @click="deleteSku(item.skuId)">删除</a>
                        <br>
                        <a>移到收藏</a>
                    </li>
                </ul>
            </div>
        </div>
        <div class="cart-tool">
            <div class="select-all">
                <input class="chooseAll" type="checkbox" :checked="checkAll && cartInfoList.length > 0" v-on:change="updateCheckAll">
                <span>全选</span>
            </div>
            <div class="option">
                <a @click="deleteAllChecked">删除选中的商品</a>
                <a>移到我的关注</a>
            </div>
            <div class="money-box">
                <div class="chosed">已选择
                    <span>{{checkedNum}}</span> 件商品</div>
                <div class="sumprice">
                    <em>总价（不含运费） ：</em>
                    <i class="summoney">{{totalPrice}}</i>
                </div>
                <div class="sumbtn">
                    <a class="sum-btn" @click="$router.push('/trade')">结算</a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    // 引入防抖和节流函数
    import debounce from 'lodash/debounce'
    import throttle from 'lodash/throttle'
    import {mapGetters} from 'vuex'
    export default {
        name: 'ShoppingCart',
        computed: {
            ...mapGetters('cartAbout', ['cartListData']),
            cartInfoList() {
                return this.cartListData.cartInfoList || []
            },
            // 总价
            totalPrice() {
                return this.cartInfoList.reduce((prev, item) => {
                    return item.isChecked === 1 ? prev + item.skuNum * item.skuPrice : prev + 0
                }, 0)
            },
            // 是否全选
            checkAll() {
                return this.cartInfoList.every(element => {
                    return element.isChecked == 1
                })
            },
            // 已选商品数量
            checkedNum() {
                return this.cartInfoList.reduce((prev, item) => {
                    return prev + (item.isChecked === 1 ? 1 : 0)
                }, 0)
            }
        },
        methods: {
            getData() {
                this.$store.dispatch('cartAbout/getShoppingCartInfo')
            },
            // 商品数量加一
            async addSkuNum(skuId) {
                // 整理参数
                let params = {skuId: skuId, skuNum: 1}
                // 向服务器发请求更改商品数量
                try {
                    await this.$store.dispatch('detailAbout/getAddOrUpdateCart', params)
                    // 成功后重新获取购物车信息
                    this.getData()
                } catch (error) {
                    alert('修改商品数量失败!')                    
                }
            },
            // 商品数量减一
            minusSkuNum: throttle(async function(skuObj) {
                // 整理参数
                let skuNum = -1
                // 判断
                if (skuObj.skuNum <= 1)
                    skuNum = 0
                let params = {skuId: skuObj.skuId, skuNum: skuNum}
                try {
                    await this.$store.dispatch('detailAbout/getAddOrUpdateCart', params)
                    // 成功后重新获取购物车信息
                    this.getData()
                } catch (error) {
                    alert('修改商品数量失败!')
                }
            }, 500),
            // input框输入商品数量
            changeSkuNum: debounce(async function(e, skuObj) {
                let value = e.target.value * 1
                let skuNum = isNaN(value) || value < 1 ? 0 : parseInt(value) - skuObj.skuNum
                let params = {skuId: skuObj.skuId, skuNum}
                try {
                    await this.$store.dispatch('detailAbout/getAddOrUpdateCart', params)
                    // 成功后重新获取购物车信息
                    this.getData()
                } catch (error) {
                    alert('修改商品数量失败!')
                }
            }, 500),
            // 删除当前商品
            async deleteSku(skuId) {
                try {
                    await this.$store.dispatch('cartAbout/deleteCart', skuId)
                    this.getData()
                } catch (error) {
                    alert('删除商品失败!')
                }
            },
            // 更改当前商品的勾选状态
            async updateChecked(e, skuId) {
                try {
                    const isChecked = e.target.checked ? '1' : '0'
                    await this.$store.dispatch('cartAbout/updateChecked', {skuId, isChecked})
                    this.getData()
                } catch (error) {
                    alert('更新商品状态失败!')
                }
            },
            // 从购物车中删除选中商品
            async deleteAllChecked() {
                try {
                    await this.$store.dispatch('cartAbout/deleteAllChecked')
                    this.getData()
                } catch (error) {
                    alert('删除商品失败!')
                }
            },
            // 全选复选框的点击操作
            async updateCheckAll(e) {
                const checked = e.target.checked ? '1' : '0'
                try {
                    await this.$store.dispatch('cartAbout/updateCheckAll', checked)
                    this.getData()
                } catch(error) {
                    alert('更新商品状态失败!')
                }
            }
        },
        mounted() {
            this.getData()
        },
    }
</script>

<style lang="less" scoped>
    .cart {
        width: 1200px;
        margin: 0 auto;

        h4 {
        margin: 9px 0;
        font-size: 14px;
        line-height: 21px;
        }

        .cart-main {
        .cart-th {
            background: #f5f5f5;
            border: 1px solid #ddd;
            padding: 10px;
            overflow: hidden;

            &>div {
            float: left;
            }

            .cart-th1 {
            width: 25%;

            input {
                vertical-align: middle;
            }

            span {
                vertical-align: middle;
            }
            }

            .cart-th2 {
            width: 25%;
            }

            .cart-th3,
            .cart-th4,
            .cart-th5,
            .cart-th6 {
            width: 12.5%;

            }
        }

        .cart-body {
            margin: 15px 0;
            border: 1px solid #ddd;

            .cart-list {
                padding: 10px;
                border-bottom: 1px solid #ddd;
                overflow: hidden;
            &>li {
                float: left;
            }

            .cart-list-con1 {
                width: 10%;
            }

            .cart-list-con2 {
                width: 40%;

                img {
                width: 82px;
                height: 82px;
                float: left;
                margin-right: 20px;
                }

                .item-msg {
                float: left;
                width: 250px;
                margin: 0 10px;
                line-height: 18px;
                }
            }

            .cart-list-con4 {
                width: 10%;

            }

            .cart-list-con5 {
                width: 16%;

                .mins {
                border: 1px solid #ddd;
                border-right: 0;
                float: left;
                color: #666;
                width: 6px;
                text-align: center;
                padding: 9px;
                }

                input {
                border: 1px solid #ddd;
                width: 40px;
                height: 34px;
                float: left;
                text-align: center;
                font-size: 14px;
                }

                .plus {
                border: 1px solid #ddd;
                border-left: 0;
                float: left;
                color: #666;
                width: 6px;
                text-align: center;
                padding: 9px;
                }
            }

            .cart-list-con6 {
                width: 11%;

                .sum {
                font-size: 16px;
                }
            }

            .cart-list-con7 {
                width: 13%;

                a {
                color: #666;
                }
            }
            }
        }
        }

        .cart-tool {
            height: 50px;
            overflow: hidden;
            border: 1px solid #ddd;

        .select-all {
            padding: 10px;
            overflow: hidden;
            float: left;

            span {
            vertical-align: middle;
            }

            input {
            vertical-align: middle;
            }
        }

        .option {
            padding: 10px;
            overflow: hidden;
            float: left;

            a {
            float: left;
            padding: 0 10px;
            color: #666;
            }
        }

        .money-box {
            float: right;
            .chosed {
                line-height: 26px;
                float: left;
                padding: 0 10px;
                margin-top: 12px;
            }

            .sumprice {
                width: 200px;
                line-height: 22px;
                float: left;
                padding: 0 10px;
                margin-top: 11px;
            .summoney {
                color: #c81623;
                font-size: 20px;
            }
            }

            .sumbtn {
            float: right;

            a {
                display: block;
                position: relative;
                width: 96px;
                height: 52px;
                line-height: 52px;
                color: #fff;
                text-align: center;
                font-size: 18px;
                font-family: "Microsoft YaHei";
                background: #e1251b;
                overflow: hidden;

                &:hover {
                    color: #fff !important;
                }
            }
            }
        }
        }
    }
</style>