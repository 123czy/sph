import apiAaxios from "./apiAxios"
import mockAxios from "./mockAxios"

//获取三级列表的请求方法
export const getBaseCategoryList = () => apiAaxios.get("/product/getBaseCategoryList");

//获取轮播图数据
export const getBanners = () => mockAxios.get("/banners");

//获取楼层数据
export const getFloors = () => mockAxios.get("/floors");

//获取搜索页数据
export const getSearchData = (options={}) => apiAaxios.post("/list",options);

export const getDetails = skuid => apiAaxios.get(`/item/${skuid}`)

export const getCarList = () => apiAaxios.get(`/cart/cartList`);

//添加购物车
export const addSkuToCart = (skuid,skuNum) => apiAaxios.post(`/cart/addToCart/${skuid}/${skuNum}`);

export const carGoodChecked = (skuId,isChecked)=> 
apiAaxios.get(`/cart/checkCart/${skuId}/${isChecked}`)
   





