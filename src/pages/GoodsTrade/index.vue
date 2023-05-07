<template>
    <div class="trade-container">
        <h3 class="title">填写并核对订单信息</h3>
        <div class="content">
            <h5 class="receive">收货人信息</h5>
            <!-- 邮寄地址栏 -->
            <div class="address clearFix" v-for="item in addressList" :key="item.id" @click="changeDefaultAddress(item)">
                <span class="username" :class="{selected: item.isDefault === '1'}">{{item.consignee}}</span>
                <p>
                    <span class="s1">{{item.fullAddress}}</span>
                    <span class="s2">{{item.phoneNum}}</span>
                    <span class="s3" v-show="item.isDefault === '1'">默认地址</span>
                </p>
            </div>
            <div class="line"></div>
            <!-- 支付方式 -->
            <h5 class="pay">支付方式</h5>
            <div class="address clearFix">
                <span class="username selected">在线支付</span>
            </div>
            <div class="line"></div>
            <h5 class="pay">送货清单</h5>
            <div class="way">
                <h5>配送方式</h5>
                <div class="info clearFix">
                    <span class="s1 selected">顺丰速运</span>
                    <p>配送时间：预计5月10日（周三）09:00-15:00送达</p>
                </div>
            </div>
            <!-- 商品信息 -->
            <div class="detail">
                <h5>商品清单</h5>
                <ul class="list clearFix" v-for="item in goodsList" :key="item.skuId">
                    <li class="list-img">
                        <img :src="item.imgUrl" alt="">
                    </li>
                    <li>
                        <p class="goods-name">{{item.skuName}}</p>
                        <h4>7天无理由退货</h4>
                    </li>
                    <li>
                        <h3>￥{{item.orderPrice}}</h3>
                    </li>
                    <li>X{{item.skuNum}}</li>
                    <li>有货</li>
                </ul>
            </div>
            <div class="bbs">
                <h5>买家留言：</h5>
                <textarea placeholder="建议留言前先与商家沟通确认" class="remarks-cont" v-model="message"></textarea>
            </div>

        </div>
        <div class="money clearFix">
            <ul>
            <li>
                <b><i>{{totalNum}}</i>件商品，总金额</b>
                <span>￥{{totalAmount}}</span>
            </li>
            <li>
                <b>返现：</b>
                <span>￥0.00</span>
            </li>
            <li>
                <b>运费：</b>
                <span>￥0.00</span>
            </li>
            </ul>
        </div>
        <div class="trade">
            <div class="price">应付总额: <span>¥{{totalAmount}}</span></div>
            <div class="receiveInfo">
                寄送至:
                <span>{{defaultAddress.fullAddress}}</span>
                收货人：<span>{{defaultAddress.consignee}}</span>
            </div>
        </div>
        <!-- 支付按钮 -->
        <div class="sub clearFix">
            <a class="subBtn" @click="toPay">提交订单</a>
        </div>
    </div>
</template>

<script>
    import {mapActions, mapGetters} from 'vuex'
    export default {
        name: 'GoodsTrade',
        data() {
            return {
                message: '',
            }
        },
        computed: {
            ...mapGetters('tradeAbout', ['addressList', 'goodsList', 'totalAmount', 'totalNum']),
            // 用户选中的邮寄地址
            defaultAddress() {
                return this.addressList.find((item) => item.isDefault === '1') || {}
            }
        },
        methods: {
            ...mapActions('tradeAbout', ['getTradeInfo', 'getAddressInfo']),
            // 修改默认地址
            changeDefaultAddress(currentAddress) {
                this.addressList.forEach(element => element.isDefault = '0')
                currentAddress.isDefault = '1'
            },
            // 向服务器发请求获取订单号并跳转到支付页面
            async toPay() {
                const tradeNo = this.$store.state.tradeAbout.tradeInfo.tradeNo
                const data = {
                    "consignee": this.defaultAddress.consignee,
                    "consigneeTel": this.defaultAddress.phoneNum,
                    "deliveryAddress": this.defaultAddress.fullAddress,
                    "paymentWay": "ONLINE",
                    "orderComment": this.message,
                    "orderDetailList": this.goodsList
                }
                // 成功获取订单号后携带query参数跳转到pay路由
                try {
                    await this.$store.dispatch('payAbout/getOrderId', {tradeNo,data})
                    this.$router.push({name: 'pay', query: {orderId: this.$store.state.payAbout.orderId}})
                } catch(error) {
                    alert(error.message)
                }
            }
        },
        mounted() {
            this.getAddressInfo()
            this.getTradeInfo()
        },
        // 组件内守卫
        beforeRouteEnter (to, from, next) {
            // trade路由只能由shoppingcart路由跳转过来
            from.name === 'shoppingcart' || from.path=== '/' ? next() : next(from.path)
        }
    }
</script>

<style lang="less" scoped>
    .trade-container {
        h3 {
            font-weight: normal;
            font-size: 16px;
            color: #4f4d4d;
        }
        .title {
            width: 1200px;
            margin: 0 auto;
            line-height: 21px;
        }

        .content {
            width: 1200px;
            margin: 10px auto 0;
            border: 1px solid rgb(221, 221, 221);
            padding: 25px;
            box-sizing: border-box;
        h5 {
            font-size: 14px;
        }
        .receive,
        .pay {
            line-height: 36px;
            margin: 18px 0;
        }

        .address {
            padding-left: 20px;
            margin-bottom: 15px;

            .username {
                float: left;
                width: 100px;
                height: 30px;
                line-height: 30px;
                text-align: center;
                border: 1px solid #ddd;
                position: relative;
            }

            .username::after {
                content: "";
                display: none;
                width: 13px;
                height: 13px;
                position: absolute;
                right: 0;
                bottom: 0;
                background: url(./images/choosed.png) no-repeat;
            }

            .username.selected {
                border-color: #e1251b;
            }

            .username.selected::after {
                display: block;
            }

            p {
                width: 610px;
                float: left;
                line-height: 30px;
                margin-left: 10px;
                padding-left: 5px;
                cursor: pointer;

            .s1 {
                float: left;

            }

            .s2 {
                float: left;
                margin: 0 5px;
            }

            .s3 {
                float: left;
                width: 56px;
                height: 24px;
                line-height: 24px;
                margin-left: 10px;
                background-color: #878787;
                color: #fff;
                margin-top: 3px;
                text-align: center;
            }
            }

            p:hover {
                background-color: #ddd;
            }
        }

        .line {
            height: 1px;
            background-color: #ddd;
        }

        .way {
            width: 1080px;
            height: 110px;
            background: #f4f4f4;
            padding: 15px;
            margin: 0 auto;

            h5 {
                line-height: 50px;
            }

            .info {
                margin-top: 20px;

            .s1 {
                float: left;
                border: 1px solid #ddd;
                width: 120px;
                height: 30px;
                line-height: 30px;
                text-align: center;
                margin-right: 10px;
            }

            p {
                line-height: 30px;
            }
            }
        }

        .detail {
            width: 1080px;

            background: #f4f4f4;
            padding: 15px;
            margin: 10px auto 0;

            h5 {
            line-height: 50px;
            }

            .list {
                display: flex;
                justify-content: space-between;



                li {
                    line-height: 30px;
                    p {
                        margin-bottom: 20px;
                    }
                    .goods-name {
                        width: 450px;   
                    }
                    h4 {
                        color: #c81623;
                        // font-weight: 400;
                    }
                    h3 {
                        color: #e12228;
                    }
                    img {
                        height: 82px;
                        width: 82px;
                    }
                }
            }
        }

        .bbs {
            margin-bottom: 15px;

            h5 {
                line-height: 50px;
            }

            textarea {
                width: 100%;
                border-color: #e4e2e2;
                line-height: 1.8;
                outline: none;
                resize: none;
            }
        }

        .bill {
            h5 {
                line-height: 50px;
            }

            div {
                padding-left: 15px;
            }
        }
        }

        .money {
            width: 1200px;
            padding-right: 50px;
            margin: 20px auto;

        ul {
            width: 220px;
            float: right;

            li {
                line-height: 30px;
                display: flex;
                justify-content: space-between;

            i {
                color: red;
            }
            }
        }
        }

        .trade {
            box-sizing: border-box;
            width: 1200px;
            padding: 10px;
            padding-right: 25px;
            margin: 10px auto;
            text-align: right;
            background-color: #f4f4f4;
            border: 1px solid #ddd;

        div {
            line-height: 30px;
        }

        .price span {
            color: #e12228;
            font-weight: 700;
            font-size: 20px;
            margin-left: 20px;
        }

        .receiveInfo {
            color: #999;
        }
        }

        .sub {
            width: 1200px;
            margin: 0 auto 10px;

        .subBtn {
            float: right;
            width: 164px;
            height: 56px;
            font: 700 18px "微软雅黑";
            line-height: 56px;
            text-align: center;
            color: #fff;
            background-color: #e1251b;

            &:hover {
                color: #fff !important;
                background-color: #f30213;
            }
        }
        }

    }
</style>