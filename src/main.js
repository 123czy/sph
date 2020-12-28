import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

//引入请求加载动画的相关环境(css文件)
import "nprogress/nprogress.css"

//引入路由环境
import router from "router/router"

//引入mock环境
import "mock/mock"

import store from  'store/store'


//注册总线
Vue.prototype.$bus = new Vue()

import "components/components"

//引入全局的动画less文件
import "common/css/transition.less"

import "util/element_ui.js"

import "util/vee"

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
