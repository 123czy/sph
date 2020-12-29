const path = require("path");
function resolve(dir){
    return path.join(__dirname,dir)
}

module.exports={
    devServer:{
      open:true,
      proxy:{
          "/api":{
              target:"http://182.92.128.115"
          }
      }
    },
    lintOnSave:false,
    configureWebpack:{
        resolve:{
            alias:{
                components:resolve("src/components"),
                pages:resolve("src/pages"),
                router:resolve("src/router"),
                routes:resolve("src/routes"),
                http:resolve("src/http"),
                mock:resolve("src/mock"),
                store:resolve("src/store")
            }
        }
    }
}