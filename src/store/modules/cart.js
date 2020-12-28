import {addSkuToCart,getCarList,carGoodChecked,delGoodList} from 'http/http'
const OK = 200;
export default {
    state:{
        cartList: [],
    },
    getters:{
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
        },
        cart_checkedAll(state){
            let flag = 0;
            state.cartList.forEach((carItem)=>{
              if(carItem.isChecked === 1){
                  flag++
              }
            })
            return state.cartList.length>0 && flag === state.cartList.length;
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
        },
        async updateChecked(store,{skuId,isChecked}){
            try{  
                const {code}=await carGoodChecked(skuId,isChecked)
                return code
            }catch(e){
                throw new Error(e)
            }
        },
         async delGoodList(store,skuId){
            try {
                const {code} = await delGoodList(skuId)
                return code
            }catch (e) {
                throw new Error(e)
            }
         },
         async delAllGoodList(store){
             try{
                const all = []
                store.state.cartList.forEach((carItem)=>{
                    if(carItem.isChecked === 1){
                        let promise = store.dispatch("delGoodList",carItem.skuId);
                        all.push(promise)    
                    }
                })
                return Promise.all(all)
             }catch(e){
                throw new Error(e)
             }
         },
          async updateAllChecked(store,allChecked){
            const all = []
            console.log(allChecked)
            store.state.cartList.forEach((cartGood)=>{
                if(cartGood.isChecked !== allChecked){
                    //发请求 修改当商品的选中状态
                    let promise = store.dispatch("updateChecked",{skuId:cartGood.skuId,isChecked:allChecked});
                    all.push(promise)
                }
            })
            return Promise.all(all)
        },
        
    },
       


}
