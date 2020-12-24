import Vue from 'vue';
import VueRouter from 'vue-router'
import routes from 'routes/routes'
Vue.use(VueRouter);
export default new VueRouter({
    routes,
    mode:"history",
    scrollBehavior (to, from, savedPosition) {
        // return 期望滚动到哪个的位置
        return {x:0,y:0}
      }
});