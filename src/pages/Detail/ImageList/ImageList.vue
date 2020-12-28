<template>
  <div class="swiper-container" ref="swiper">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="(item,index) in goodsDetail.skuInfo.skuImageList" :key="index.id">
        <img v-if="goodsDetail.skuInfo" :src="item.imgUrl" @click="chooseImg(index)" :class="{active:currentIndex===index}">
      </div>
    </div>
    <div class="swiper-button-next"></div>
    <div class="swiper-button-prev"></div>
  </div>
</template>

<script>
import "swiper/swiper-bundle.min.css"
import Swiper from "swiper/swiper-bundle.min.js"
   import {mapState} from "vuex"
   
  export default {
    name: "ImageList",
    data(){
      return {
        currentIndex:0
      }
    },
    computed:{
      ...mapState({
        goodsDetail:state =>state.detail.goodsDetail
      })
    },
    methods:{
      chooseImg(index){
        this.currentIndex = index;
         this.$bus.$emit("sendIndex",index)
      },
     
    },
    watch: {
       "goodsDetail.skuInfo.skuImageList":{
            handler(val){
              // console.log(val)
          this.$nextTick(()=>{
    new Swiper (this.$refs.swiper, {
    // direction: 'vertical', // 垂直切换选项
    loop:this.loop, // 循环模式选项
     slidesPerView:5,
     slidesPerGroup:2,
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

<style lang="less" scoped>
  .swiper-container {
    height: 56px;
    width: 412px;
    box-sizing: border-box;
    padding: 0 12px;

    .swiper-slide {
      width: 56px;
      height: 56px;

      img {
        width: 100%;
        height: 100%;
        border: 1px solid #ccc;
        padding: 2px;
        width: 50px;
        height: 50px;
        display: block;

        &.active {
          border: 2px solid #f60;
          padding: 1px;
        }

        &:hover {
          border: 2px solid #f60;
          padding: 1px;
        }
      }
    }

    .swiper-button-next {
      left: auto;
      right: 0;
    }

    .swiper-button-prev {
      left: 0;
      right: auto;
    }

    .swiper-button-next,
    .swiper-button-prev {
      box-sizing: border-box;
      width: 12px;
      height: 56px;
      background: rgb(235, 235, 235);
      border: 1px solid rgb(204, 204, 204);
      top: 0;
      margin-top: 0;
      &::after {
        font-size: 12px;
      }
    }
  }
</style>