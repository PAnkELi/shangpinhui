<template>
  <div>
    <TypeNav />
    <div class="main">
      <div class="py-container">
        <!--bread-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <!-- 面包屑 -->
          <ul class="fl sui-tag">
            <!-- 商品类名面包屑 -->
            <li class="with-x" v-show="searchParams.categoryName">
              {{searchParams.categoryName}}
              <i @click="removeCategoryName">×</i>
            </li>
            <!-- 商品关键字面包屑 -->
            <li class="with-x" v-show="searchParams.keyword">
              {{searchParams.keyword}}
              <i @click="removeKeyword">×</i>
            </li>
            <!-- 商品品牌面包屑 -->
            <li class="with-x" v-show="searchParams.trademark">
              {{searchParams.trademark.split(":")[1]}}
              <i @click="removeTrademark">×</i>
            </li>
            <!-- 商品属性面包屑 -->
            <li class="with-x" v-for="(item, index) in searchParams.props" :key="index">
              {{item.split(':')[1]}}
              <i @click="removeAttr(index)">×</i>
            </li>
          </ul>
        </div>
        <!--selector-->
        <SearchSelector @getTrademarkInfo="getTrademarkInfo" @getAttrInfo="getAttrInfo"/>
        <!--details-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <!-- 排序操作栏 -->
              <ul class="sui-nav">
                <li :class="{active: isOrder}" @click="changeOrder('1')">
                  <a>综合 <span v-show="isOrder" :class="isAsc"></span> </a>
                </li>
                <li :class="{active: !isOrder}" @click="changeOrder('2')">
                  <a>价格 <span v-show="!isOrder" :class="isAsc"></span> </a>
                </li>
                <li>
                  <a>销量</a>
                </li>
              </ul>
            </div>
          </div>
          <div class="goods-list">
            <!-- 商品详情页 -->
            <ul class="yui3-g">
              <li class="yui3-u-1-5" v-for="item in goodsList" :key="item.id">
                <div class="list-wrap">
                  <!-- 图片 -->
                  <div class="p-img">
                    <router-link :to="`/detail/${item.id}`">
                      <img v-lazy="item.defaultImg"/>
                    </router-link>
                  </div>
                  <!-- 价格 -->
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>{{item.price}}</i>
                    </strong>
                  </div>
                  <!-- 标题 -->
                  <div class="attr">
                    <a @click="$router.push(`/detail/${item.id}`)" :title="item.title" v-html="item.title"></a>
                  </div>
                  <!-- 底部信息 -->
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a class="sui-btn btn-bordered btn-danger">自营</a>
                    <a href="javascript:void(0);" class="sui-btn btn-bordered">放心购</a>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <!-- 分页器 -->
          <MyPagination :pageNo="searchParams.pageNo" :continues="5" :pageSize="searchParams.pageSize" :total="total || 0" @getPageNum="getPageNum"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import SearchSelector from './SearchSelector'
  import {mapGetters} from 'vuex'
  export default {
    name: "MySearch",
    components: {
      SearchSelector,
    },
    data() {
      return {
        // 数据驱动页面 将route中的参数存到这里 从而实现数据数据驱动页面
        searchParams: {
          category1Id: "",
          category2Id: "",
          category3Id: "",
          categoryName: "",
          keyword: "",
          order: "1:desc",
          pageNo: 1,
          pageSize: 10,
          props: [],
          trademark: ""
        }
      }
    },
    computed: {
      // 映射store中的数据为计算属性
      ...mapGetters('searchAbout', ['attrsList', 'goodsList', 'trademarkList', 'total']),
      // 排序or综合
      isOrder() {
        return this.searchParams.order.indexOf('1') !== -1
      },
      // 升序or降序
      isAsc() {
        const temp = this.searchParams.order.indexOf('asc') !== -1
        return temp ? 'iconfont icon-direction-up' : 'iconfont icon-direction-down'
      }
    },
    methods: {
      // 向服务器发请求获取数据
      getData() {
        this.$store.dispatch('searchAbout/getSearchList', this.searchParams)
      },
      // 移除分类名面包屑时的操作
      removeCategoryName() {
        // query和params似乎只能在路由跳转的时候传递 是只读的
        // this.$route.query = {1: '111'}
        // 修改route携带的参数并重新向服务器发送请求
        this.searchParams.categoryName = ''
        this.$router.push({name: 'search', params: this.$route.params})
      },
      // 移除关键字面包屑时的操作
      removeKeyword() {
        this.$router.push({name: 'search', query: this.$route.query})
        this.$bus.$emit('clearKeyword')
        this.searchParams.keyword = ''
      },
      // 获取用户选择的品牌信息并向服务器发请求获得所对应的数据
      getTrademarkInfo(info) {
        this.searchParams.trademark = `${info.tmId}:${info.tmName}`
        // 这一行代码执行会出现bug 问题还没找到
        // this.$router.push({name: 'search', query: this.searchParams, params: this.$route.params})
        this.getData()
      },
      // 移除品牌信息面包屑
      removeTrademark() {
        this.searchParams.trademark = ''
        this.getData()
      },
      // 获取用户选择的商品属性信息并向服务器发请求获得所对应的数据
      getAttrInfo(attrName, attrObj) {
        const propsItem = `${attrObj.attrId}:${attrName}:${attrObj.attrName}`
        // 这里要注意去重
        if (this.searchParams.props.indexOf(propsItem) === -1) {
          this.searchParams.props.push(propsItem)
          this.getData()
        }
      },
      // 移除商品属性面包屑
      removeAttr(index) {
        // 数据驱动页面
        this.searchParams.props.splice(index, 1)
        this.getData()
      },
      // 进行排序操作
      changeOrder(flag) {
        let newOrder = ''
        const originFlag = this.searchParams.order.split(':')[0]
        const originSort = this.searchParams.order.split(':')[1]
        if (flag === originFlag) {
          newOrder = `${flag}:${originSort === 'asc' ? 'desc' : 'asc'}`
        } else {
          newOrder = `${flag}:${'desc'}`
        }
        this.searchParams.order = newOrder
        this.getData()
      },
      // 获取到用户选择的页码并发请求
      getPageNum(pageNum) {
        // console.log(pageNum, typeof pageNum)
        this.searchParams.pageNo = pageNum
        this.getData()
      }
    },
    watch: {
      // 侦听路由的变化 若发生变化则携带新的参数向服务器发请求
      $route: {
        immediate: true,
        handler() {
          // console.log('route发生改变')
          // undefined字段不会传给服务器
          this.searchParams.category1Id = undefined
          this.searchParams.category2Id = undefined
          this.searchParams.category3Id = undefined
          Object.assign(this.searchParams, this.$route.query, this.$route.params)
          this.getData()
        }
      }
    },
    // beforeMount() {
    //   Object.assign(this.searchParams, this.$route.query, this.$route.params)
    // },
    // mounted() {
    //   this.getData(this.searchParams)
      // 此时数据还没请求回来 组件中还没数据
      // console.log(this.attrsList)
    // },
  };
</script>

<style lang="less" scoped>
  .main {
    margin: 10px 0;

    .py-container {
      width: 1200px;
      margin: 0 auto;

      .bread {
        margin-bottom: 5px;
        overflow: hidden;

        .sui-breadcrumb {
          padding: 3px 15px;
          margin: 0;
          font-weight: 400;
          border-radius: 3px;
          float: left;

          li {
            display: inline-block;
            line-height: 18px;

            a {
              color: #666;
              text-decoration: none;

              &:hover {
                color: #4cb9fc;
              }
            }
          }
        }

        .sui-tag {
          margin-top: -5px;
          list-style: none;
          font-size: 0;
          line-height: 0;
          padding: 5px 0 0;
          margin-bottom: 18px;
          float: left;

          .with-x {
            font-size: 12px;
            margin: 0 5px 5px 0;
            display: inline-block;
            overflow: hidden;
            color: #000;
            background: #f7f7f7;
            padding: 0 7px;
            height: 20px;
            line-height: 20px;
            border: 1px solid #dedede;
            white-space: nowrap;
            transition: color 400ms;
            cursor: pointer;

            i {
              margin-left: 10px;
              cursor: pointer;
              font: 400 14px tahoma;
              display: inline-block;
              height: 100%;
              vertical-align: middle;
            }

            &:hover {
              color: #28a3ef;
            }
          }
        }
      }

      .details {
        margin-bottom: 5px;

        .sui-navbar {
          overflow: visible;
          margin-bottom: 0;

          .filter {
            min-height: 40px;
            padding-right: 20px;
            background: #fbfbfb;
            border: 1px solid #e2e2e2;
            padding-left: 0;
            border-radius: 0;
            box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

            .sui-nav {
              position: relative;
              left: 0;
              display: block;
              float: left;
              margin: 0 10px 0 0;

              li {
                float: left;
                line-height: 18px;

                a {
                  display: block;
                  cursor: pointer;
                  padding: 11px 15px;
                  color: #777;
                  text-decoration: none;
                }

                &.active {
                  a {
                    background: #e1251b;
                    color: #fff;

                    &:hover {
                      background: #e1251b;
                      color: #fff !important;
                    }
                  }
                }
              }
            }
          }
        }

        .goods-list {
          margin: 20px 0;

          ul {
            display: flex;
            flex-wrap: wrap;

            li {
              height: 100%;
              width: 20%;
              margin-top: 10px;
              line-height: 28px;

              .list-wrap {
                .p-img {
                  padding-left: 15px;
                  width: 215px;
                  height: 255px;

                  a {
                    color: #666;

                    img {
                      max-width: 100%;
                      height: auto;
                      vertical-align: middle;
                    }
                  }
                }

                .price {
                  padding-left: 15px;
                  font-size: 18px;
                  color: #c81623;

                  strong {
                    font-weight: 700;

                    // i {
                    //   margin-left: -5px;
                    // }
                  }
                }

                .attr {
                  padding-left: 15px;
                  width: 85%;
                  overflow: hidden;
                  margin-bottom: 8px;
                  min-height: 38px;
                  cursor: pointer;
                  line-height: 1.8;
                  display: -webkit-box;
                  -webkit-box-orient: vertical;
                  -webkit-line-clamp: 2;

                  a {
                    color: #333;
                    text-decoration: none;
                  }
                }

                .commit {
                  padding-left: 15px;
                  height: 22px;
                  font-size: 13px;
                  color: #a7a7a7;

                  span {
                    font-weight: 700;
                    color: #646fb0;
                  }
                }

                .operate {
                  padding: 12px 15px;

                  .sui-btn {
                    display: inline-block;
                    padding: 2px 14px;
                    box-sizing: border-box;
                    margin-bottom: 0;
                    font-size: 12px;
                    line-height: 18px;
                    text-align: center;
                    vertical-align: middle;
                    cursor: pointer;
                    border-radius: 0;
                    background-color: transparent;
                    margin-right: 15px;
                  }

                  .btn-bordered {
                    min-width: 85px;
                    background-color: transparent;
                    border: 1px solid #8c8c8c;
                    color: #8c8c8c;

                    &:hover {
                      border: 1px solid #666;
                      color: #fff !important;
                      background-color: #666;
                      text-decoration: none;
                    }
                  }

                  .btn-danger {
                    border: 1px solid #e1251b;
                    color: #e1251b;

                    &:hover {
                      border: 1px solid #e1251b;
                      background-color: #e1251b;
                      color: white !important;
                      text-decoration: none;
                    }
                  }
                }
              }
            }
          }
        }

        .page {
          width: 733px;
          height: 66px;
          overflow: hidden;
          float: right;

          .sui-pagination {
            margin: 18px 0;

            ul {
              margin-left: 0;
              margin-bottom: 0;
              vertical-align: middle;
              width: 490px;
              float: left;

              li {
                line-height: 18px;
                display: inline-block;

                a {
                  position: relative;
                  float: left;
                  line-height: 18px;
                  text-decoration: none;
                  background-color: #fff;
                  border: 1px solid #e0e9ee;
                  margin-left: -1px;
                  font-size: 14px;
                  padding: 9px 18px;
                  color: #333;
                }

                &.active {
                  a {
                    background-color: #fff;
                    color: #e1251b;
                    border-color: #fff;
                    cursor: default;
                  }
                }

                &.prev {
                  a {
                    background-color: #fafafa;
                  }
                }

                &.disabled {
                  a {
                    color: #999;
                    cursor: default;
                  }
                }

                &.dotted {
                  span {
                    margin-left: -1px;
                    position: relative;
                    float: left;
                    line-height: 18px;
                    text-decoration: none;
                    background-color: #fff;
                    font-size: 14px;
                    border: 0;
                    padding: 9px 18px;
                    color: #333;
                  }
                }

                &.next {
                  a {
                    background-color: #fafafa;
                  }
                }
              }
            }

            div {
              color: #333;
              font-size: 14px;
              float: right;
              width: 241px;
            }
          }
        }
      }
    }
  }
</style>