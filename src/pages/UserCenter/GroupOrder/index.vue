<template>
    <div class="order-right">
        <div class="order-content">
            <div class="title">
                <h3>团购订单</h3>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'GroupOrder',
    }
</script>

<style lang="less" scoped>
    .order-right {
        float: right;
        width: 83.33%;
        //订单部分
        .order-content {
            margin: 0 20px;
            color: #666;

            //标题
            .title {
            margin-bottom: 22px;
            border: 1px solid #ddd;

            h3 {
                padding: 12px 10px;
                font-size: 15px;
                background-color: #f1f1f1;

            }
            }
        }
    }
</style>