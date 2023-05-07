<template>
    <div class="type-nav">
        <div class="container">
            <div @mouseleave="removeClass" @mouseenter="enterShow">
                <h2 class="all">全部商品分类</h2>
                <div class="sort" v-show="isShow">
                    <!-- 这里使用事件委托 给父元素绑定一个点击事件 -->
                    <div class="all-sort-list2" @click="goSearch($event)">
                        <div class="item" v-for="(c1, index) in category" :key="c1.categoryId">
                            <!-- 一级标题 -->
                            <h3 @mouseenter="addClass(index)" :class="{current: currentIndex === index}">
                                <!-- 这里如果用router-link跳转 会生成很多组件 影响性能 -->
                                <a 
                                    :data-categoryName="c1.categoryName"
                                    :data-category1Id="c1.categoryId"
                                >
                                    {{c1.categoryName}}
                                </a>
                            </h3>
                            <div 
                                class="item-list clearfix" 
                                :style="{display: currentIndex === index ? 'block' : 'none'}"
                            >
                                <div class="subitem" v-for="c2 in c1.categoryChild" :key="c2.categoryId">
                                    <dl class="fore">
                                        <!-- 二级标题 -->
                                        <dt>
                                            <a 
                                                :data-categoryName="c2.categoryName"
                                                :data-category2Id="c2.categoryId"
                                            >
                                                {{c2.categoryName}}
                                            </a>
                                        </dt>
                                        <!-- 三级标题 -->
                                        <dd>
                                            <em v-for="c3 in c2.categoryChild" :key="c3.categoryId">
                                                <a 
                                                    :data-categoryName="c3.categoryName"
                                                    :data-category3Id="c3.categoryId"
                                                >
                                                    {{c3.categoryName}}
                                                </a>
                                            </em>
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <nav class="nav">
                <a href="###">服装城</a>
                <a href="###">美妆馆</a>
                <a href="###">尚品汇超市</a>
                <a href="###">全球购</a>
                <a href="###">闪购</a>
                <a href="###">团购</a>
                <a href="###">有趣</a>
                <a href="###">秒杀</a>
            </nav>

        </div>
    </div>
</template>

<script>
    import {mapState} from 'vuex'
    // 引入lodash的节流模块
    import throttle from 'lodash/throttle'
    export default {
        name: 'TypeNav',
        data() {
            return {
                // 数据驱动页面
                currentIndex: -1,
                isShow: true,
            }
        },
        computed: {
            ...mapState('homeAbout', ['category'])
        },
        methods: {
            // 创建一个节流函数
            // 这里要注意this指向问题 如果用箭头函数 this指向为undefined
            addClass: throttle(function(index) {
                this.currentIndex = index
                // console.log('@@')
            }, 50),
            // 鼠标离开时一级标题取消高亮
            removeClass() {
                this.currentIndex = -1
                if (this.$route.name === 'search' || this.$route.name === 'detail') {
                    this.isShow = false
                }
            },
            // 点击跳转到search组件
            goSearch(e) {
                if (e.target.tagName === 'A') {
                    // console.log(e.target.dataset)
                    let query = {}
                    let params = {}
                    const {categoryname, category1id, category2id, category3id} = e.target.dataset
                    query.categoryName = categoryname
                    if (category1id) {
                        query.category1Id = category1id
                    } else if (category2id) {
                        query.category2Id = category2id
                    } else if (category3id) {
                        query.category3Id = category3id
                    }
                    // 路由跳转的时候 如果有params参数 就合并后一起传给路由组件
                    if (this.$route.params) {
                        params = this.$route.params
                        this.$router.push({
                            name: 'search',
                            query,
                            params,
                        })
                    } else {
                        this.$router.push({
                            name: 'search',
                            query,
                        })
                    }
                }
            },
            // 控制在search组件中显示商品分类栏
            enterShow() {
                if (this.$route.name === 'search' || this.$route.name === 'detail') {
                    this.isShow = true
                }
            }
        },
        beforeMount() {
            // 考虑到性能问题 这行代码放到App组件中去执行
            // this.$store.dispatch('homeAbout/getCategory')
            // 挂载完毕之前进行判断 若为search组件 则隐藏商品分类栏
            if (this.$route.name === 'search' || this.$route.name === 'detail') {
                this.isShow = false
            }
        },
    }
</script>

<style lang="less" scoped>
    .type-nav {
        border-bottom: 2px solid #e1251b;

        .container {
            width: 1200px;
            margin: 0 auto;
            display: flex;
            position: relative;

            .all {
                cursor: pointer;
                width: 210px;
                height: 45px;
                background-color: #e1251b;
                line-height: 45px;
                text-align: center;
                color: #fff;
                font-size: 14px;
                font-weight: bold;
            }

            .nav {
                a {
                    height: 45px;
                    margin: 0 22px;
                    line-height: 45px;
                    font-size: 16px;
                    color: #333;
                }
            }

            .sort {
                position: absolute;
                left: 0;
                top: 45px;
                width: 210px;
                height: 461px;
                position: absolute;
                background: #fafafa;
                z-index: 999;

                .all-sort-list2 {
                    .item {
                        h3 {
                            // 原本为30px
                            line-height: 29px;
                            font-size: 14px;
                            font-weight: 400;
                            overflow: hidden;
                            padding: 0 20px;
                            margin: 0;

                            a {
                                color: #333;
                            }
                        }

                        .item-list {
                            display: none;
                            position: absolute;
                            width: 734px;
                            min-height: 460px;
                            background: #f7f7f7;
                            left: 210px;
                            border: 1px solid #ddd;
                            top: 0;
                            z-index: 9999 !important;

                            .subitem {
                                float: left;
                                width: 650px;
                                padding: 0 4px 0 8px;

                                dl {
                                    border-top: 1px solid #eee;
                                    padding: 6px 0;
                                    overflow: hidden;
                                    zoom: 1;

                                    &.fore {
                                        border-top: 0;
                                    }

                                    dt {
                                        float: left;
                                        width: 54px;
                                        line-height: 22px;
                                        text-align: right;
                                        padding: 3px 6px 0 0;
                                        font-weight: 700;
                                    }

                                    dd {
                                        float: left;
                                        width: 415px;
                                        padding: 3px 0 0;
                                        overflow: hidden;

                                        em {
                                            float: left;
                                            height: 14px;
                                            line-height: 14px;
                                            padding: 0 8px;
                                            margin-top: 5px;
                                            border-left: 1px solid #ccc;
                                        }
                                    }
                                }
                            }
                        }
                    }
                    .current {
                        background-color: #ccc;
                    }
                }
            }
        }
    }
</style>