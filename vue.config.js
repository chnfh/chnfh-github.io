// //

// /**
//  * @type {import('@vue/cli-service').ProjectOptions}
//  */
module.exports = {
  // 选项...

  outputDir: "docs", //输出文件夹 default: 'dist'

  // css: { //
  //   extract: false
  // }

  configureWebpack: {
    resolve: {
      // 别名配置
      // HTML/CSS ... 等文件使用别名需要加上 ~
      // src: '~_img/...'
      alias: {
        assets: "@/assets",
        _img: "@/assets/images/",
        common: "@/components/common",
      },
    },
  },
};
