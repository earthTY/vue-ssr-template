module.exports = (isDev) => {
  return {
    preserveWhiteSpace:true, //去除空客
    extractCSS: !isDev,

    cssModules: {
      localIdentName: isDev ? '[path]-[name]-[hash:base64:5]' : '[hash:base64:5]',
      camelCase: true //命名 转换。比如 。class-header => classHeader
    }
  }
}
