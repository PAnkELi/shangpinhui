<template>
    <div class="swiper-container" ref="swiperBox">
        <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="(item, index) in skuImageList" :key="item.id">
                <img :src="item.imgUrl" :class="{active: index == currentIndex}" @click="changeIndex(index)">
            </div>
        </div>
        <div class="swiper-button-next"></div>
        <div class="swiper-button-prev"></div>
  </div>
</template>

<script>
    import Swiper from 'swiper'
    import {mapGetters} from 'vuex'
    export default {
        name: 'ImageList',
        data() {
            return {
                currentIndex: 0,
            }
        },
        computed: {
            ...mapGetters('detailAbout', ['skuInfo']),
            // 轮播图数据
            skuImageList() {
                return this.skuInfo.skuImageList || []
            }
        },
        methods: {
            changeIndex(index) {
                this.currentIndex = index
                this.$bus.$emit('getCurrentIndex', index)
            }
        },
        watch: {
            skuImageList() {
                this.$nextTick(function() {
                    new Swiper(this.$refs.swiperBox, {
                        //设置轮播图防线
                        direction: "horizontal",
                        // loop:true,
                        // 如果需要前进后退按钮
                        navigation: {
                            nextEl: ".swiper-button-next",
                            prevEl: ".swiper-button-prev",
                        },
                        //展示区域同时展示两张图片
                        slidesPerView: 'auto',
                        // 两张图片为一组进行切换
                        slidesPerGroup : 1,
                    })
                })
            }
        },
    }
</script> 

<style scoped lang="less">
    .swiper-container {
        height: 56px;
        width: 412px;
        box-sizing: border-box;
        padding: 0 12px;

        .swiper-slide {
            width: 56px;
            height: 56px;

            img {
            width: 100%;
            height: 100%;
            border: 1px solid #ccc;
            padding: 2px;
            width: 50px;
            height: 50px;
            display: block;

            &.active {
                border: 2px solid #f60;
                padding: 1px;
            }

            &:hover {
                border: 2px solid #f60;
                padding: 1px;
            }
            }
        }

        .swiper-button-next {
            left: auto;
            right: 0;
        }

        .swiper-button-prev {
            left: 0;
            right: auto;
        }

        .swiper-button-next,
        .swiper-button-prev {
            box-sizing: border-box;
            width: 12px;
            height: 56px;
            background: rgb(235, 235, 235);
            border: 1px solid rgb(204, 204, 204);
            top: 0;
            margin-top: 0;
            &::after {
            font-size: 12px;
            }
        }
    }
</style>