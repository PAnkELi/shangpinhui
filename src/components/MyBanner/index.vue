<template>
    <div class="swiper-container" ref="swiperBox">
        <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="item in list" :key="item.id">
                <img :src="item.imgUrl">
            </div>
        </div>
        <!-- 如果需要分页器 -->
        <div class="swiper-pagination"></div>
        <!-- 如果需要导航按钮 -->
        <div class="swiper-button-prev"></div>
        <div class="swiper-button-next"></div>
    </div>
</template>

<script>
    import Swiper from 'swiper'
    export default {
        name: 'MyBanner',
        props: ['list'],
        watch: {
            list: {
                immediate: true,
                handler() {
                    // 监听到list数据发生变化后 等到下一次DOM更新结束后再执行回调实例化Swiper对象
                    this.$nextTick(function() {
                        new Swiper(this.$refs.swiperBox, {
                            // 循环模式选项
                            loop: true, 
                            // 自动播放
                            autoplay: true,
                            // 如果需要分页器
                            pagination: {
                                el: '.swiper-pagination',
                                clickable: true,
                            },
                            // 如果需要前进后退按钮
                            navigation: {
                                nextEl: '.swiper-button-next',
                                prevEl: '.swiper-button-prev',
                            },
                        })
                    })
                }
            }
        },
    }
</script>

<style lang="css">
    .swiper-container {
        cursor: pointer;
    }
</style>