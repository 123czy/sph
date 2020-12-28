<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body" v-for="car in carList" :key="car.skuId">
        <ul class="cart-list">
          <li class="cart-list-con1">
            <input type="checkbox" name="chk_list"  @change="changeFn(car.skuId,car.isChecked)" :isChecked="car.isChecked === 1">
          </li>
          <li class="cart-list-con2">
            <img :src="car.imgUrl">
            <div class="item-msg">{{car.skuName}}</div>
          </li>
          <li class="cart-list-con3">
            <div class="item-txt">语音升级款</div>
          </li>
          <li class="cart-list-con4">
            <span class="price"> {{car.skuPrice}}</span>
          </li>
          <li class="cart-list-con5">
            <a href="javascript:void(0)" class="mins" @click="updateCartNum(car,-1)">-</a>
            <input autocomplete="off" type="text" :value="car.skuNum" minnum="1" class="itxt">
            <a href="javascript:void(0)" class="plus" @click="updateCartNum(car,1)">+</a>
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{car.skuNum *car.skuPrice}}</span>
          </li>
          <li class="cart-list-con7">
            <a href="#none" class="sindelet" @click="delCart(car.skuId)">删除</a>
            <br>
            <a href="#none">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input class="chooseAll" type="checkbox"  :disabled="carList.length<=0" v-model="cart_checkedAll">
        <span >全选</span>
      </div>
      <div class="option">
        <a href="#none" @click="deleteAll">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">已选择
          <span>{{cart_checkedTotal}}</span>件商品</div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{cart_priceTotal}}</i>
        </div>
        <div class="sumbtn">
          <!-- <a class="sum-btn" href="###" target="_blank" @click="toPay">结算</a> -->
          <router-link  to="/Trade" class="sum-btn"  >结算</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState,mapActions, mapGetters} from 'vuex'
  export default {
    name: 'ShopCart',
    async created(){
      await this.getCarList()
    },
   computed:{
     ...mapState({
       carList : state=>state.cart.cartList
     }),
     ...mapGetters(["cart_checkedTotal","cart_priceTotal"]),
     cart_checkedAll:{
       get(){
         return this.$store.getters.cart_checkedAll
       },
      async set(val){
          val = val ? 1 : 0;
         try {
                    const codeArr = await this.updateAllChecked(val)
                    if(codeArr.every(code=>code===200)){
                        //同步仓库
                        await this.getCarList()
                    }else{
                        alert("全选操作失败")
                    }
                }catch (e) {
                    alert("网络问题")
                } 
       }
     }
   },
  methods:{
    ...mapActions(["getCarList","addSkuToCart",
    "updateChecked","updateAllChecked","delGoodList","checkedAll","delAllGoodList"]),
   async updateCartNum(cartGood,skuNum){
            //skuNum : 代表新增 或 减少的数量
            //商品在购物车中一开始的数量
            const orginNum = cartGood.skuNum;
            //商品在购物车中即将达到的总数量
            const total = orginNum + skuNum;
            //总数量不能是小于零的数
            if(total>0){
                const code =await this.addSkuToCart({skuid:cartGood.skuId, skuNum})
                if(code === 200){
                    await this.getCarList()
                }else{
                    this.$alert("添加操作失败")
                }
            }
        },
        async changeFn(skuId,isChecked){
            isChecked = isChecked === 0?1:0;
           const code = await this.updateChecked({skuId,isChecked});
               if(code == 200){
                   //同步仓库
                   await this.getCarList()
               }else{
                   alert("选中操作失败")
               }
        },
        async delCart(skuid){
           const code = await this.delGoodList(skuid)  
           if(code===200){
             await this.getCarList()
           }else{
             this.$alert("删除失败")
           }
            
        },
         async deleteAll(){
            try {
                const codeArr = await this.delAllGoodList() 
                if(codeArr.every(code=>code===200)){
                    //同步仓库
                    await this.getCarList()
                }else{
                    this.$alert("批量删除操作失败")
                }
            }catch (e) {
                this.$alert("网络问题")
            }
        },
        
  
  }
  }
</script>

<style lang="less" scoped>
  .cart {
    width: 1200px;
    margin: 0 auto;

    h4 {
      margin: 9px 0;
      font-size: 14px;
      line-height: 21px;
    }

    .cart-main {
      .cart-th {
        background: #f5f5f5;
        border: 1px solid #ddd;
        padding: 10px;
        overflow: hidden;

        &>div {
          float: left;
        }

        .cart-th1 {
          width: 25%;

          input {
            vertical-align: middle;
          }

          span {
            vertical-align: middle;
          }
        }

        .cart-th2 {
          width: 25%;
        }

        .cart-th3,
        .cart-th4,
        .cart-th5,
        .cart-th6 {
          width: 12.5%;

        }
      }

      .cart-body {
        margin: 15px 0;
        border: 1px solid #ddd;

        .cart-list {
          padding: 10px;
          border-bottom: 1px solid #ddd;
          overflow: hidden;

          &>li {
            float: left;
          }

          .cart-list-con1 {
            width: 4.1667%;
          }

          .cart-list-con2 {
            width: 25%;

            img {
              width: 82px;
              height: 82px;
              float: left;
            }

            .item-msg {
              float: left;
              width: 150px;
              margin: 0 10px;
              line-height: 18px;
            }
          }

          .cart-list-con3 {
            width: 20.8333%;

            .item-txt {
              text-align: center;
            }
          }

          .cart-list-con4 {
            width: 12.5%;

          }

          .cart-list-con5 {
            width: 12.5%;

            .mins {
              border: 1px solid #ddd;
              border-right: 0;
              float: left;
              color: #666;
              width: 6px;
              text-align: center;
              padding: 8px;
            }

            input {
              border: 1px solid #ddd;
              width: 40px;
              height: 33px;
              float: left;
              text-align: center;
              font-size: 14px;
            }

            .plus {
              border: 1px solid #ddd;
              border-left: 0;
              float: left;
              color: #666;
              width: 6px;
              text-align: center;
              padding: 8px;
            }
          }

          .cart-list-con6 {
            width: 12.5%;

            .sum {
              font-size: 16px;
            }
          }

          .cart-list-con7 {
            width: 12.5%;

            a {
              color: #666;
            }
          }
        }
      }
    }

    .cart-tool {
      overflow: hidden;
      border: 1px solid #ddd;

      .select-all {
        padding: 10px;
        overflow: hidden;
        float: left;

        span {
          vertical-align: middle;
        }

        input {
          vertical-align: middle;
        }
      }

      .option {
        padding: 10px;
        overflow: hidden;
        float: left;

        a {
          float: left;
          padding: 0 10px;
          color: #666;
        }
      }

      .money-box {
        float: right;

        .chosed {
          line-height: 26px;
          float: left;
          padding: 0 10px;
        }

        .sumprice {
          width: 200px;
          line-height: 22px;
          float: left;
          padding: 0 10px;

          .summoney {
            color: #c81623;
            font-size: 16px;
          }
        }

        .sumbtn {
          float: right;

          a {
            display: block;
            position: relative;
            width: 96px;
            height: 52px;
            line-height: 52px;
            color: #fff;
            text-align: center;
            font-size: 18px;
            font-family: "Microsoft YaHei";
            background: #e1251b;
            overflow: hidden;
          }
        }
      }
    }
  }
</style>