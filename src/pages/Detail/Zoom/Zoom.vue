<template>
  <div class="swiper" >
    <!-- <img v-if="goodsDetail.skuInfo"   :src="goodsDetail.skuInfo.skuImageList[currentIndex].imgUrl" />
    <div class="event"></div>
    <div class="big">
      <img v-if="goodsDetail.skuInfo" ref="bigImage"
           :src="goodsDetail.skuInfo.skuImageList[currentIndex].imgUrl" /> -->
          <pic-zoom :url="goodsDetail.skuInfo.skuImageList[currentIndex].imgUrl"></pic-zoom>
    <!-- </div> -->
    <div class="mask" ref="mask"></div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import PicZoom from 'vue-piczoom'
  export default {
    name: "Zoom",
    components:{
       PicZoom
    },
    data(){
      return {
        currentIndex:0
      }
    },
    computed:{
      ...mapState({
        goodsDetail:state=>state.detail.goodsDetail
      })
    },
    mounted(){
      this.$bus.$on("sendIndex",(index)=>{
        this.currentIndex = index
      })
    }
  }
</script>

<style lang="less">
   
// .magnifier-box img {
//   width:400px !important;
//   height: 400px !important;
// }
.swiper{
  width:400px;
  height: 400px;;
}
.mouse-cover-canvas{
  left:750px !important;
  top:240px !important;
  width:400px !important;
  border:none !important;
}
</style>

 