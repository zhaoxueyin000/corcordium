const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  css: {
    loaderOptions: {
      postcss: {
        postcssOptions: {
          plugins: [
            require('postcss-pxtorem')({
              rootValue: 192,
              exclude: 'MobileContent',
              propList: ['*'],
              selectorBlackList: ['.mobile-', '.v-font-']
            }),
            require('postcss-pxtorem')({
              rootValue: 75,
              exclude: 'PCContent', // 排除pc
              propList: ['*'],
              selectorBlackList: ['.pc-', '.v-font-']
            })
          ]
        }
      }
    }
  }
})
