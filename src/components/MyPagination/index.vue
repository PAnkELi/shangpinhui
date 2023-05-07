<template>
    <div class="pagination">
        <button :disabled="pageNo == 1" @click="$emit('getPageNum', pageNo - 1)">上一页</button>
        <button v-show="startNumEndNum.start !== 1" @click="$emit('getPageNum', 1)">1</button>
        <button v-show="startNumEndNum.start > 2">···</button>
        <button 
            v-for="(item, index) in startNumEndNum.end" 
            :key="index" 
            v-show="item >= startNumEndNum.start"
            @click="$emit('getPageNum', item)"
            :class="{active: item == pageNo}"
        >
            {{item}}
        </button>
        <button v-show="startNumEndNum.end < totalPage - 1">···</button>
        <button v-show="startNumEndNum.end !== totalPage" @click="$emit('getPageNum', totalPage)">{{totalPage}}</button>
        <button :disabled="pageNo == totalPage" @click="$emit('getPageNum', pageNo + 1)">下一页</button>
    <button style="margin-left: 30px">共 {{total}} 条</button>
  </div>
</template>

<script>
    export default {
        name: "MyPagination",
        // pageNo 当前页 
        // continues 连续页码数 
        // pageSize 每页显示几条数据 
        // total 总数据数量
        props: ['pageNo', 'continues',  'pageSize', 'total'],
        computed: {
            // 计算总页码数
            totalPage() {
                return Math.ceil(this.total / this.pageSize)
            },
            // 计算起始页码和结束页码
            startNumEndNum() {
                const {pageNo, continues, totalPage} = this
                let start = 0, end = 0
                if (totalPage < continues) {
                    start = 1
                    end = totalPage
                } else {
                    start = pageNo - Math.floor(continues / 2)
                    end = pageNo + Math.floor(continues / 2)
                    if (start < 1) {
                        start = 1
                        end = continues
                    } else if (end > totalPage) {
                        start = totalPage - continues + 1
                        end = totalPage
                    }
                }
                return {start, end}
            },
        },
        methods: {
            sendPageNum(e) {
                if (e.target.tagName === 'BUTTON')
                    // console.log(e.target.innerText)
                    this.$emit('getPageNum', e.target.innerText)
            }
        },
        mounted() {
            // console.log(this.pageNo, typeof this.pageNo)
        },
    }
</script>

<style lang="less" scoped>
    .pagination {
        text-align: center;
        button {
            margin: 0 5px;
            background-color: #f4f4f5;
            color: #606266;
            outline: none;
            border-radius: 2px;
            padding: 0 4px;
            vertical-align: top;
            display: inline-block;
            font-size: 13px;
            min-width: 35.5px;
            height: 28px;
            line-height: 28px;
            cursor: pointer;
            box-sizing: border-box;
            text-align: center;
            border: 0;

            &[disabled] {
                color: #c0c4cc;
                cursor: not-allowed;
            }

            &.active {
                cursor: not-allowed;
                background-color: rgb(201, 22, 35);
                color: #fff;
            }
        }
    }
</style>
