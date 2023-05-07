<template>
    <div class="order-main">
        <div class="container">
            <div class="order-body">
                <!--左侧列表-->
                <div class="order-left">
                    <dl>
                        <dt><i>·</i> 订单中心</dt>
                        <dd><router-link to="/usercenter/myorder">我的订单</router-link></dd>
                        <dd><router-link to="/usercenter/grouporder">团购订单</router-link></dd>
                        <dd>评价晒单</dd>
                    </dl>
                    <dl>
                        <dt><i>·</i> 关注中心</dt>
                        <dd>关注的商品 </dd>
                        <dd>关注的店铺</dd>
                        <dd>浏览历史</dd>
                    </dl>
                    <dl>
                        <dt><i>·</i> 特色业务</dt>
                        <dd>我的营业厅 </dd>
                        <dd>节能补贴</dd>
                        <dd>医药服务 </dd>
                        <dd>流量加油站 </dd>
                    </dl>
                </div>
                <!-- 右侧内容 -->
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'UserCenter',
    }
</script>

<style lang="less" scoped>
    .order-main {
    .container {
        margin: 0 auto;
        width: 1200px;

        .order-body {
        padding: 10px;
        color: #333;

        &:after {
            content: "";
            display: block;
            clear: both;
        }

        //左边
        .order-left {
            float: left;
            width: 16.67%;

            dl {
            line-height: 28px;

            dt {
                font-weight: 700;
                padding: 5px;

                i {
                color: #77b72c;
                }
            }

            dd {
                margin: 0 0 6px;
                border-bottom: 1px solid #ededed;
                text-align: center;
            }
            }
        }

        //右边
        .order-right {
            float: right;
            width: 83.33%;
        }
        }
    }
    }
</style>