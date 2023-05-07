<template>
    <header class="header">
        <!-- 头部的第一行 -->
        <div class="top">
            <div class="container">
                <div class="loginList">
                    <p>尚品汇欢迎您！</p>
                    <p v-if="!userInfo.name">
                        <span>请</span>
                        <router-link to="/login">登录</router-link>
                        <router-link to="/register" class="register">免费注册</router-link>
                    </p>
                    <p v-else>
                        <a>{{userInfo.nickName}}</a>
                        <a class="register" @click="logout">退出登录</a>
                    </p>
                </div>
                <div class="typeList">
                    <a @click="$router.push('/usercenter')">我的订单</a>
                    <a @click="$router.push('/shoppingcart')">我的购物车</a>
                    <a href="http://www.atguigu.com/web/" target="_blank">关注尚品汇</a>
                    <a @click="newGift" style="color: #f30213;">zjl专属新人礼包</a>
                    <a @click="backend">商家后台</a>
                </div>
            </div>
        </div>
        <!--头部第二行 搜索区域-->
        <div class="bottom">
            <h1 class="logoArea">
                <router-link class="logo" to="/home">
                    <img src="./images/logo.png" alt="">
                </router-link>
            </h1>
            
            <div class="searchArea" v-show="$route.meta.searchShow">
                <form @submit.prevent class="searchForm">
                    <input type="text" id="autocomplete" class="input-error input-xxlarge" v-model="keyWord" @keydown.enter="goSearch"/>
                    <!-- 这里需要做一个编程式路由导航 -->
                    <button class="sui-btn btn-xlarge btn-danger" type="button" @click="goSearch">搜索</button>
                </form>
            </div>
        </div>
    </header>
</template>

<script>
    import {mapState} from 'vuex'
    export default {
        name: 'MyHeader',
        data() {
            return {
                keyWord: '',
            }
        },
        computed: {
            ...mapState('userAbout', ['userInfo'])
        },
        methods: {
            // 搜索
            goSearch() {
                let query = {}
                // 当没有query参数的时候 传过来的是一个空对象
                if (this.$route.query) {
                    query = this.$route.query
                }
                this.$router.push({
                    name: 'search',
                    params: {
                        // 用undefined方法解决传递空串时URL路径不对的问题
                        keyword: this.keyWord || undefined
                    },
                    // 合并参数
                    query,
                })
            },
            // 退出登录
            async logout() {
                try {
                    await this.$store.dispatch('userAbout/logout')
                    this.$router.push('/home')
                } catch (error) {
                    alert(error.message)
                }
            },
            // 后台
            backend() {
                this.$message('后台功能建设中')
            },
            newGift() {
                this.$message('想得美')
            }
        },
        mounted() {
            this.$bus.$on('clearKeyword', () => this.keyWord = '')
        },
    }
</script>

<style lang="less" scoped>
    .header {
    &>.top {
        background-color: #eaeaea;
        height: 30px;
        line-height: 30px;

        .container {
            width: 1200px;
            margin: 0 auto;
            overflow: hidden;

            .loginList {
                float: left;

                p {
                    float: left;
                    margin-right: 10px;

                    .register {
                        color: #f30213;
                        border-left: 1px solid #b3aeae;
                        padding: 0 5px;
                        margin-left: 5px;
                    }
                }
            }

            .typeList {
                float: right;

                a {
                    padding: 0 10px;

                    &+a {
                        border-left: 1px solid #b3aeae;
                    }
                }

            }

        }
    }

    &>.bottom {
        width: 1200px;
        margin: 0 auto;
        overflow: hidden;

        .logoArea {
            float: left;

            .logo {
                img {
                    width: 175px;
                    margin: 25px 45px;
                }
            }

            .logo-tip {
                font-size: 22px;
                color: #333;
                font-weight: normal;
                position: absolute;
                left: 185px;
                top: 45px;
            }
        }

        .searchArea {
            float: right;
            margin-top: 35px;

            .searchForm {
                overflow: hidden;

                input {
                    box-sizing: border-box;
                    width: 490px;
                    height: 32px;
                    padding: 0px 4px;
                    border: 2px solid #ea4a36;
                    float: left;

                    &:focus {
                        outline: none;
                    }
                }

                button {
                    height: 32px;
                    width: 68px;
                    background-color: #ea4a36;
                    border: none;
                    color: #fff;
                    float: left;
                    cursor: pointer;

                    &:focus {
                        outline: none;
                    }
                }
            }
        }
    }
    }
</style>