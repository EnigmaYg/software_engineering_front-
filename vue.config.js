module.exports = {
  transpileDependencies: true,
  publicPath:'./',

  devServer:{
    proxy:{
      '/api': {
        target: 'http://127.0.0.1:9091',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
}
