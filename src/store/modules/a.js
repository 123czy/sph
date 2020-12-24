import {getBaseCategoryList,getBanners,getFloors} from "http/http";
const OK =200;
export default {
    state:{
        CategoryList:[],
        banners:[],
        floors:[]
    },
    getters:{},
    mutations:{
        getCategoryList(state,CategoryList){
            state.CategoryList = CategoryList
        },
        getBanners(state,banners){
            state.banners = banners
        },
        getFloors(state,floors){
            state.floors = floors
        }
    },
    actions:{
        async getCategoryList(store){
            //发送请求 获取三级分类数据
            const {code,data} = await getBaseCategoryList();
            if(code === OK)
                store.commit("getCategoryList",data.filter((item,index)=>{return index<15}))
        },
        async getBanners(store){
            const {code,data} = await getBanners();
            if(code === OK){
                store.commit("getBanners",data)
            }
            return data;
        },
        async getFloors(store){
            const {code,data} = await getFloors();
            if(code === OK){
                store.commit("getFloors",data)
            }
            return data;

        }
    }
}
