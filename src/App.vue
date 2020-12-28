<template>
  <div id="app">
    <sph-header></sph-header>
    <router-view></router-view>
    <sph-footer></sph-footer>
  </div>
</template>

<script>
 import Header from 'components/Header/Header'
 import Footer from 'components/Footer/Footer'
import {mapActions} from "vuex";
export default {
  name: 'App',
  methods:{
        ...mapActions(["getCategoryList","getBanners","getFloors","autoLogin"])
    },
  components:{
    "sph-header":Header,
    "sph-footer":Footer
  },
  async created(){
        await this.getCategoryList()
        //1
        await this.getBanners()
        await this.getFloors()
        
    },
  async mounted(){
       await this.autoLogin()
    }
}
</script>
<style>
</style>
