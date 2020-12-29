<template>
    <div class="starWrap">
        <span class="star" :class="[`star-${size}`,star]"
                v-for="(star,index) in starsState" :key="index">
        </span>
    </div>
</template>

<script>
    const ON = "on";
    const HALF = "half";
    const OFF = "off";
    export default {
        name: "stars",
        props:{
            score:Number,
            size:String
        },
        computed:{
            //根据score生成一个数组 ["on","on","on","half","off"]
            starsState(){
                return [ON,ON,ON,HALF,OFF]
            }
        }
    }
</script>

<style scoped lang="stylus">
    @import "../../common/css/mixin.styl"
    .star
        display inline-block;
        background-repeat no-repeat
        background-size 100% 100%
        &.star-24
            width 10px
            height 10px
            &.on
                bg-image(star24_on)
            &.half
                bg-image(star24_half)
            &.off
                bg-image(star24_off)
        &.star-36
            width 15px
            height 15px
            &.on
                bg-image(star36_on)
            &.half
                bg-image(star36_half)
            &.off
                bg-image(star36_off)
        &.star-48
            width 20px
            height 20px
            &.on
                bg-image(star48_on)
            &.half
                bg-image(star48_half)
            &.off
                bg-image(star48_off)
</style>