<template>
    <div>
        <!-- Home组件 -->
        <TypeNav/>
        <ListContainer/>
        <TodayRecommend/>
        <GoodsRank/>
        <LikeGoods/>
        <GoodsFloor v-for="item in floorList" :key="item.id" :floor="item"/>
        <GoodsBrand/>
    </div>
</template>

<script>
    import ListContainer from './ListContainer'
    import TodayRecommend from './TodayRecommend'
    import GoodsRank from './GoodsRank'
    import LikeGoods from './LikeGoods'
    import GoodsFloor from './GoodsFloor'
    import GoodsBrand from './GoodsBrand'
    import {mapState} from 'vuex'
    export default {
        name: 'MyHome',
        components: {ListContainer, TodayRecommend, GoodsRank, LikeGoods, GoodsFloor, GoodsBrand},
        computed: {
            ...mapState('homeAbout', ['floorList'])
        },
        methods: {
            openNotification() {
                const h = this.$createElement;

                this.$notify({
                title: '温馨提示',
                message: h('i', { style: 'color: teal'}, '目前后台数据仅有手机分类 其他分类的数据正在完善中'),
                offset: 100
                });
            },
        },
        mounted() {
            // 派发一个action 用于获取GoodsFloor组件中需要的数据
            this.$store.dispatch('homeAbout/getFloorList')
            this.openNotification()
        },
    }
</script>

<style>

</style>