module.exports = {
  transpileDependencies: [
    'vuetify'
  ],

  publicPath: './',
  pluginOptions: {
    electronBuilder: {
      builderOptions: {
        productName: '五星莊園客户信息查询系统'
      }
    }
  }
}