<template>
  <div id="app">
      <seller-header></seller-header>
       <div class="nav">
         <router-link to="/goods">商品</router-link>
         <router-link to="/ratings">评价</router-link>
         <router-link to="/seller">商家</router-link>
       </div>
      <router-view></router-view>
  </div>
</template>

<script>
import header from 'components/header/header';

export default {
  name: 'App',
  components: {
     "seller-header":header
  }
}
</script>

<style scoped lang="less">
     @import "./common/css/mixin";
     .nav{
       .one-px(rgba(7,17,27,.1));
       height: 40px;
       width: 100%;
       background:pink;
       display:flex;
       align-items: center;
       justify-content:space-around;
     }
</style>
