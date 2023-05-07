<template>
    <div class="pay-main">
        <div class="pay-container">
            <div class="checkout-tit">
                <h4 class="tit-txt">
                    <span class="success-icon iconfont icon-chenggong"></span>
                    <span class="success-info">订单提交成功，请您及时付款，以便尽快为您发货~~</span>
                </h4>
                <div class="paymark">
                    <span class="fl">请您在提交订单<em class="orange time">3小时</em>之内完成支付，超时订单会自动取消。订单号：<em>{{orderId}}</em></span>
                    <span class="fr"><em class="lead">应付金额：<em class="orange money">￥{{orderInfo.totalFee}} </em> 元</em></span>
                </div>
            </div>
            <div class="checkout-info">
                <h4>重要说明：</h4>
                <ol>
                    <li>尚品汇商城支付平台目前支持<span class="zfb">微信</span>支付方式。</li>
                    <li>其它支付渠道正在调试中，敬请期待。</li>
                </ol>
                <h4>支付宝账户信息：</h4>
                <ul>
                    <li>支付帐号：11111111</li>
                    <li>密码：111111</li>
                    <li>支付密码：111111</li>
                </ul>
            </div>
            <div class="checkout-steps">
                <div class="step-tit">
                    <h5>支付平台</h5>
                </div>
                <div class="step-cont">
                    <ul class="payType">
                        <li><img src="./images/pay2.jpg"></li>
                        <li><img src="./images/pay3.jpg"></li>
                    </ul>
                </div>
                <div class="hr"></div>
                <div class="submit">
                    <el-button type="text" class="btn" @click="open">立即支付</el-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    // 引入QRcode
    import QRCode from 'qrcode'
    export default {
        name: 'OrderPay',
        data() {
            return {
                orderInfo: {},
                timer: null,
                code: '',
            }
        },
        computed: {
            // 订单号
            orderId() {
                return this.$route.query.orderId
            }
        },
        methods: {
            // 获取支付信息
            async getPayInfo() {
                let result = await this.$http.reqPayInfo(this.orderId)
                if (result.code === 200) {
                    this.orderInfo = result.data
                } else
                    alert(result.message)
            },
            // 弹窗显示二维码并发请求验证用户是否支付成功
            // 两种情况下会跳转 1.用户点击已支付按钮服务器验证成功后跳转 2.用户支付成功后自动跳转
            async open() {
                const codeUrl = await QRCode.toDataURL(this.orderInfo.codeUrl)
                this.$alert(`<img src="${codeUrl}" />`, '请使用微信扫描二维码完成支付', {
                    dangerouslyUseHTMLString: true,
                    showClose: false,
                    showCancelButton: true,
                    cancelButtonText: '取消支付',
                    confirmButtonText: '我已支付',
                    center: true,
                    lockScroll: false,
                    closeOnClickModal: true,
                    // 弹窗关闭前的回调
                    beforeClose: (action, instance, done) => {
                        // 已支付按钮
                        if (action === 'confirm' && this.code === 200) {
                            // 关闭定时器
                            clearInterval(this.timer)
                            // 关闭弹窗
                            done()
                            // 路由跳转
                            this.$router.push('/paysuccess')
                        } else if (action === 'cancel' || action === 'close') {
                            clearInterval(this.timer)
                            done()
                        }
                    }
                });
                this.timer = setInterval(async () => {
                    let result = await this.$http.reqPayStatus(this.orderId)
                    // 支付成功
                    if (result.code === 200) {
                        this.code = 200
                        // 关闭定时器
                        clearInterval(this.timer)
                        // 路由跳转
                        // 关闭弹窗
                        this.$msgbox.close()
                        this.$router.push('/paysuccess')
                    } else {
                        this.code = result.code
                    }
                }, 1000)
            },
        },
        mounted() {
            this.getPayInfo()
        },
    }
</script>

<style lang="less" scoped>
    .pay-main {
        margin-bottom: 20px;

        .pay-container {
        margin: 0 auto;
        width: 1200px;

        a:hover {
            color: #4cb9fc;
        }

        .orange {
            color: #e31613;
        }

        .money {
            font-size: 18px;
            font-weight: 700;
        }

        .zfb {
            color: #e1251b;
            font-weight: 700;
        }

        .checkout-tit {
            padding: 10px;

            .tit-txt {
            font-size: 14px;
            line-height: 21px;

            .success-icon {
                font-size: 22px;
                margin-top: 5px;
                display: inline-block;
                color: #6aaf04;
            }

            .success-info {
                padding: 0 8px;
                line-height: 30px;
                vertical-align: top;
            }
            }

            .paymark {
            overflow: hidden;
            line-height: 26px;
            text-indent: 38px;

            .fl {
                float: left;
            }

            .fr {
                float: right;

                .lead {
                margin-bottom: 18px;
                font-size: 14px;
                font-weight: 400;
                line-height: 22.5px;
                }
            }
            }
        }

        .checkout-info {
            padding-left: 25px;
            padding-bottom: 15px;
            margin-bottom: 10px;
            border: 2px solid #e1251b;

            h4 {
            margin: 9px 0;
            font-size: 14px;
            line-height: 21px;
            color: #e1251b;
            }

            ol {
            padding-left: 25px;
            list-style-type: decimal;
            line-height: 24px;
            font-size: 14px;
            }

            ul {
            padding-left: 25px;
            list-style-type: disc;
            line-height: 24px;
            font-size: 14px;
            }
        }

        .checkout-steps {
            border: 1px solid #ddd;
            padding: 25px;
            h5 {
                font-size: 14px;
            }
            .hr {
            height: 1px;
            background-color: #ddd;
            }

            .step-tit {
            line-height: 36px;
            margin: 15px 0;
            }

            .step-cont {
            margin: 0 10px 12px 20px;

            ul {
                font-size: 0;

                li {
                margin: 2px;
                display: inline-block;
                padding: 5px 20px;
                border: 1px solid #ddd;
                cursor: pointer;
                line-height: 18px;
                }
            }
            }
        }

        .submit {
            text-align: center;

            .btn {
                display: inline-block;
                padding: 15px 45px;
                margin: 15px 0 10px;
                font: 18px "微软雅黑";
                font-weight: 700;
                border-radius: 0;
                background-color: #e1251b;
                border: 1px solid #e1251b;
                color: #fff;
                text-align: center;
                vertical-align: middle;
                cursor: pointer;
                user-select: none;
                text-decoration: none;

                &:hover {
                    background-color: #f30213;    
                }
            }
        }
        }
    }
</style>