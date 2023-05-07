<template>
    <div>
        <MyHeader></MyHeader>
        <!-- 路由组件展示区 -->
        <router-view></router-view>
        <MyFooter v-show="$route.meta.footerShow"></MyFooter>
    </div>
</template>

<script>
    import MyHeader from './components/MyHeader'
    import MyFooter from './components/MyFooter'
    export default {
        name: 'App',
        components: {
            MyHeader,
            MyFooter,
        },
        mounted() {
            // 派发一个action 用于获取商品分类三级列表的数据
            this.$store.dispatch('homeAbout/getCategory')
        },
    }
</script>