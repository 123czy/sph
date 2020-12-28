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

export const delGoodList = (skuId)=>apiAaxios.delete(`/cart/deleteCart/${skuId}`)


export const login = (phone,password) => apiAaxios.post(`/user/passport/login`,{phone,password})

export const logout = () => apiAaxios.get(`/user/passport/logout`)
   
export const autoLogout = () => apiAaxios.get(`/user/passport/auth/getUserInfo`)

export const register = (phone,password,code)=> apiAaxios.post(`/user/passport/register`,{phone,password,code})

export const codeChange = ()=> apiAaxios.get(`/user/passport/code`)

export const getTrade = () => apiAaxios.get(`/order/auth/trade`);
export const getOrders = (page,limit) => apiAaxios.get(`/order/auth/${page}/${limit}`);
export const getPayInfo = orderId => apiAaxios.get(`/payment/weixin/createNative/${orderId}`);
export const getPayState = orderId => apiAaxios.get(`/payment/weixin/queryPayStatus/${orderId}`);
export const submitOrder = (tradeNo,order) => apiAaxios({
  url:"/order/auth/submitOrder",
  method:"post",
  data:order,
  params:{tradeNo}
});



