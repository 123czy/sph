import {addSkuToCart,getCarList,cartGoodChecked} from 'http/http'
const OK = 200;
export default {
    state:{
        cartList: [],
    },
    getters:{
        // checkAll(state){
           
        // }
        cart_checkedTotal(state){
          let flag = 0;
          state.cartList.forEach((carItem)=>{
              if(carItem.isChecked === 1){
                  flag += carItem.skuNum
              }
          })
          return flag
        },
        cart_priceTotal(state){
            let flag = 0;
            state.cartList.forEach((carItem)=>{
                flag += (carItem.cartPrice*carItem.skuNum)
            })
            return flag
        }
    },
    mutations:{
         getCarList(state,cartList) {
            state.cartList = cartList;
        }
    },
    actions:{
        async addSkuToCart(store, {skuid, skuNum}) {
            try {
                //添加购物车成功之后进行路由跳转;跳转到AddCartSuccess界面;如果没有成功提示用户
                const {code} = await addSkuToCart(skuid, skuNum);
                return code
            } catch (e) {
                throw new Error(e)
            }
        },
        //只有这一个action能调mutation改仓库的数据
        async getCarList({commit}){
          const {code,data} = await getCarList();
          if(code === OK)
          commit('getCarList',data)
         return data
        }
    },
        async updateChecked(store,{skuId,isChecked}){
            try{
    const {code}=await cartGoodChecked(skuId,isChecked)
    console.log(code,111)
      return code
            }catch(e){
                console.log(code,222)
                throw new Error(e)
            }
        },
        async updateAllChecked(store,allChecked){
            //allChecked : 全选按钮当前的状态  0:没选中;1:选中
            //当前购物车中选中状态与 allChecked 不一致的都得换成allChecked
            const all = []
            store.state.cartList.forEach((cartGood)=>{
                if(cartGood.isChecked !== allChecked){
                    //发请求 修改当商品的选中状态
                    let promise = store.dispatch("updateChecked",{skuId:cartGood.skuId,isChecked:allChecked});
                    all.push(promise)
                }
            })
            return Promise.all(all)
        }


}
