import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

// //引入请求加载动画的相关环境(css文件)
// import "nprogress/nprogress.css"

//引入路由环境
import router from "router/router"

//引入mock环境
// import "mock/mock"

//引入vuex环境
import store from "store/store"

import icon from "components/icon/icon.vue"
import stars from "components/stars/stars.vue"
Vue.component("v-icon",icon)
Vue.component("v-stars",stars)

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')