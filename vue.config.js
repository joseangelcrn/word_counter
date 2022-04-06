module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  publicPath: process.env.VUE_APP_NODE_ENV === 'production'
      ? '/word_counter/'
      : '/'
}
