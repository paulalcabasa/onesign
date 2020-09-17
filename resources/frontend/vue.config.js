const path = require("path");

module.exports = {
 
  // publicPath: '/metronic/preview/vue/demo1/',
  // output built static files to Laravel's public dir.
  // note the "build" script in package.json needs to be modified as well.
  
  devServer: { port: 8080, proxy: "http://localhost/" },

  outputDir: '../../public/assets/app',
  publicPath: process.env.NODE_ENV === 'production'
    ? process.env.VUE_APP_BUILD_ENV
    : '/',

  // modify the location of the generated HTML file.
  indexPath: process.env.NODE_ENV === 'production'
    ? '../../../resources/views/app.blade.php'
    : 'index.html',
  
};
