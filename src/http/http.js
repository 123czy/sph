import apiAaxios from "./apiAxios"
import mockAxios from "./mockAxios"


//获取三级列表的请求方法
export const getBaseCategoryList = () => apiAaxios.get("/product/getBaseCategoryList");

//获取轮播图数据
export const getBanners = () => mockAxios.get("/banners");
//获取楼层数据
export const getFloors = () => mockAxios.get("/floors");

