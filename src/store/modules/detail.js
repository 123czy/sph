import {getDetails} from "http/http";
const OK =200;
export default {
   state:{
       goodsDetail:{
           
       }
   },
   getters:{
    checkedAttrs(state){
        let attrs = []
        state.goodsDetail.spuSaleAttrList && state.goodsDetail.spuSaleAttrList.forEach((attr)=>{
            attr.spuSaleAttrValueList.forEach((val)=>{
                if(val.isChecked === "1"){
                    attrs.push(val)
                }
            })
        })
        return attrs
    }
   },
   mutations:{
      getDetails(state,goodsDetail){
         state.goodsDetail = goodsDetail;
     },
     activeFn(state,{attrIndex,valIndex}){
        state.goodsDetail.spuSaleAttrList.forEach((attr,index)=>{
            if(attrIndex === index){
                //找到对应的属性 将其所有值的isChecked状态置为"0"
                attr.spuSaleAttrValueList.forEach((val)=>{
                    val.isChecked = "0"
                })
            }
        })

        //将选中那一条置为1
        state.goodsDetail.spuSaleAttrList[attrIndex].spuSaleAttrValueList[valIndex].isChecked = "1"
     }
   },
   actions:{
       async getDetails({commit},skuid){
           const {code,data} = await getDetails(skuid)
        //    console.log(data)
           if (code === OK)
              commit("getDetails",data)
              return data
       },
       async activeFn({commit},{attrIndex,valIndex}){
        //将attrIndex,valIndex选中的属性值变为选中状态的 其他都变回未选中状态
        commit("activeFn",{attrIndex,valIndex})
    }
   }
}