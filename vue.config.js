module.exports = {
  publicPath: './',
  configureWebpack: {
    resolve: {
      alias: {
        'assets': '@/assets',
        'common': '@/common',
        'components': '@/components',
        'network': '@/network',
        'views': '@/views',
        'pages': '@/pages'
      }
    }
  },
  chainWebpack: config => {
    config.plugin('html').tap(args => {
      console.log(args);
      args[0].title = "AMC"
      return args
    })
  }
}