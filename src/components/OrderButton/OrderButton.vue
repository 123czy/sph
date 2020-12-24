<template>
    <ul class="sui-nav">
               <li v-for="(orderType,index) in orderTypes" :key="index"
            :class="{active:orderActive(`${orderType.id}`)}" @click="orderFn(`${orderType.id}`)">
            <a href="javascript:;" style="display: flex;align-items: center">
                <span>{{orderType.name}}</span>
                <i v-if="orderActive(`${orderType.id}`)" class="iconfont"></i>
            </a>
        </li>
    </ul>
</template>

<script>

export default {
    name: "OrderButton",
    props:["orderTypes","order"],
    computed:{
       orderActive(){
                return (flag)=>{
                    return this.order.split(`:`)[0] === flag
                }
            }
    },
    methods:{
      async orderFn(index){
                //index:`1` 代表点击的是综合
                //index:`2` 代表点击的是价格
                this.$emit("click",index)
            }
    }
}
</script>

<style scoped lang="less">
    .sui-nav {
        display: inline-flex;
        margin: 0 10px 0 0;
        li {
            float: left;
            line-height: 18px;
            margin-left: 20px;
            a {
                display: block;
                cursor: pointer;
                padding: 11px 15px;
                color: #777;
                text-decoration: none;
            }
            &.active {
                a {
                    background: #e1251b;
                    color: #fff;
                }
            }
        }
    }
</style>