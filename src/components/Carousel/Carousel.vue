<template>
     <div ref="swiper" class="swiper-container" id="mySwiper">
          <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="banner in list" :key=banner.id>
              <img :src="banner.imgUrl" />
            </div>
          </div>
          <!-- 如果需要分页器 -->
          <div class="swiper-pagination"></div>

          <!-- 如果需要导航按钮 -->
          <div class="swiper-button-prev"></div>
          <div class="swiper-button-next"></div>
    </div>
</template>

<script>
import "swiper/swiper-bundle.min.css"
import Swiper from 'swiper/swiper-bundle.min.js'
export default {
    name:'Carousel',
    props:["list","loop","autoplay"],
    watch: {
        list: {
            handler(val){
              // console.log(val)
          this.$nextTick(()=>{
    new Swiper (this.$refs.swiper, {
    // direction: 'vertical', // 垂直切换选项
    loop:this.loop, // 循环模式选项
    
    // 如果需要分页器
    pagination: {
      el: '.swiper-pagination',
    },
    
    // 如果需要前进后退按钮
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    
    // 如果需要滚动条
    scrollbar: {
      el: '.swiper-scrollbar',
    },
    autoplay:this.autoplay
  })    
       
            })
            },
            deep:true,
            immediate:true
        }
    }

}
</script>

<style scoped lang="less">

</style>