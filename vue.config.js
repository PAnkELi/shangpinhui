const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  // 关闭eslint校验工具
  // lintOnSave: false
  // 不生成map文件
  productionSourceMap: false,
  // 配置代理服务器
  devServer: {
    proxy: {
      '/api': {
        target: 'http://gmall-h5-api.atguigu.cn',
      },
    }
  },
  // 设置网页标题
  pages: {
    index: {
      entry: 'src/main.js',
      title: '尚品汇-正品低价、品质保障！'
    }
  }
})
