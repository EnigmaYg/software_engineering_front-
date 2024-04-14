module.exports = {
  transpileDependencies: true,
  publicPath:'./',

  server:{
    proxy:{
      '/api': {
        target: 'http://localhost:9091',
        ChangeOrigin: true,
        rewrite: (path) =>path.replace(/^\/api/, '')
      }
    }
  }
}
