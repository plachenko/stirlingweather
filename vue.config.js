module.exports = {
  publicPath: './',
  chainWebpack: config => {
      config.module
          .rule('md')
          .test(/\.md$/i)
          .use('raw-loader')
              .loader('raw-loader')
  }
}
