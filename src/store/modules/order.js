import {getTrade,getOrders,getPayInfo,getPayState,submitOrder} from "http/http";
const OK =200;
export default {
    state:{
        tradeInfo:{
        }, //交易信息
        orderInfo:{}, //订单信息
        payInfo:{}    //支付信息
    },
    getters:{

    },
    mutations:{
        getTradeInfo(state,tradeInfo){
            state.tradeInfo = tradeInfo
        },
        getOrderInfo(state,orderInfo){
            state.orderInfo = orderInfo
        },
        getPayInfo(state,payInfo){
            state.payInfo = payInfo
        }
    },
    actions: {
        async getTradeInfo({commit}) {
            const {code, data} = await getTrade();
            if (code === OK)
                commit("getTradeInfo", data);

            return data
        },
        async getOrderInfo({commit},{page,limit}) {
            const {code, data} = await getOrders(page,limit);
            if (code === OK)
                commit("getOrderInfo", data);

            return data
        },
        async getPayInfo({commit},orderId) {
            const {code, data} = await getPayInfo(orderId);
            if (code === OK)
                commit("getPayInfo", data);

            return data
        },
        async submitOrder({commit},{tradeNo,order}){
                const {code,data} = await submitOrder(tradeNo,order)
                return {code,data}
        },
        async getPayState({commit},orderId){
            const {code, message} = await getPayState(orderId);
            return {code, message}
        }
    }
}