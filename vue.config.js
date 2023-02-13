/*
 * @Author: web.王晓冬
 * @Date: 2020-03-25 14:14:18
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2021-06-10 14:02:34
 * @Description: file content
 */
const CopyWebpackPlugin = require('copy-webpack-plugin')
const path = require('path')


const plugins = [
  {
    from: path.resolve('src/manifest.json'),
    to: `${path.resolve('dist')}/manifest.json`
  },
  // {
  //   from: path.resolve('src/assets/logo.png'),
  //   to: `${path.resolve('dist')}/img/logo.png`
  // }
]
module.exports = {
  devServer: {
    host: "0.0.0.0",
    port: 8088, // 端口号
    https: false, // https:{type:Boolean}
    open: true, //配置自动启动浏览器
    proxy: {
      "/apis": {
        target: "http://106.75.136.242:8088/", //  本地
        changeOrigin: true,
        pathRewrite: {
          '^/apis': ''
        }
      },
    },
  },
  // 构建输入文件夹
  outputDir: process.env.NODE_ENV == 'web' ? 'search' : 'dist',

  css: {
    // 是否使用css扩展
    requireModuleExtension: true,
    //   loaderOptions: { // 向 CSS 相关的 loader 传递选项 
    //     less: {
    //         javascriptEnabled: true
    //     }
    //  }
  },
  productionSourceMap: false,
  // publicPath: process.env.NODE_ENV === 'production' ?
  //   '../' : './',
  // publicPath: process.env.NODE_ENV === 'production' ? '../search' : './',
  publicPath: './',
  // configureWebpack: {
  //   externals: {
  //     'vue': 'Vue',
  //     'vuex': 'Vuex',
  //     'vue-router': 'VueRouter',
  //     'element-ui': 'ELEMENT',
  //     'axios': 'axios'
  //   }
  // }
  runtimeCompiler: true,
  configureWebpack: {
    entry: {
      // background: './src/background/background.js',
      // content: './src/content/content.js'
    },
    output: {
      filename: 'js/[name].js'
    },
    plugins: [new CopyWebpackPlugin(plugins)]
  },

}