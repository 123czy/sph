import {getSearchData} from "http/http";
const OK =200;
export default {
    state:{
       searchData:{} 
    },
    getters:{},
    mutations:{
       getSearchData(state,searchData){
           state.searchData = searchData;
           console.log(searchData)
            
       }
    },
    actions:{
     async  getSearchData({commit},options){
           const {code,data} = await getSearchData(options)
            // console.log(data)
            // console.log(options)
           if(code === OK)
           commit("getSearchData",data)
         return data
        }
    }
}
