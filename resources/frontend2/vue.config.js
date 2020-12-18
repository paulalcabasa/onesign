const path = require("path");


module.exports = {
    
  devServer: { port: 8080, proxy: "http://localhost/" },

  outputDir: '../../public/assets/app',
  publicPath: process.env.NODE_ENV === 'production'
    ? process.env.VUE_APP_BUILD_ENV
    : '/',

  // modify the location of the generated HTML file.
  indexPath: process.env.NODE_ENV === 'production'
    ? '../../../resources/views/app.blade.php'
    : 'index.html',

 
  configureWebpack: {
    resolve: {
      alias: {
        // If using the runtime only build
        vue$: "vue/dist/vue.runtime.esm.js" // 'vue/dist/vue.runtime.common.js' for webpack 1
        // Or if using full build of Vue (runtime + compiler)
        // vue$: 'vue/dist/vue.esm.js'      // 'vue/dist/vue.common.js' for webpack 1
      }
    }
  },
  chainWebpack: config => {
   
  },
  css: {
    loaderOptions: {
      postcss: {
        config: {
          path: __dirname
        }
      },
      scss: {
        prependData: `@import "@/assets/sass/vendors/vue/vuetify/variables.scss";`
      }
    }
  },
 // transpileDependencies: ["vuetify"]
};
