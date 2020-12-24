 const path = require('path')
 const OPEN = process.env.OPEN && Boolean(process.env.OPEN)
 function resolve (dir) {
      return path.join(__dirname, dir)
    }
    module.exports={
        configureWebpack : {
        resolve: {
        alias: {
          components:resolve('src/components'),
          routes:resolve('src/routes'),
          router:resolve('src/router'),
          store:resolve('src/store'),
          http:resolve('src/http'),
          mock:resolve('src/mock'),
          pages:resolve('src/pages'),
          common:resolve('src/common'),
          util:resolve('src/util')
        }
        }
    },
     devServer:{
      open:true,
      proxy:{
          "/api":{
              target:"http://182.92.128.115"
          }
      }
    },
    lintOnSave:false
    }
   