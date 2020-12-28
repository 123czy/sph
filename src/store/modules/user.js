import {getUUID} from "util"
import {login,logout,autoLogout,register,codeChange} from "http/http"
const OK =200;
export default {
    state:{
        // uuid:uuidv4()这样写的uuid是临时的，界面一刷新又要打印一个新的uuid,而正确的是在用户登录之前只能有一个uuid
        uuid:getUUID(),
        userInfo:{}
    },
    mutations:{
        login(state,userInfo){
            state.userInfo = userInfo
        }
    },
    actions:{
        async login({commit},{phone,password}){
            try {
                const {code,data,message} = await login(phone,password);
                if(code===OK){
                    //提交mutation 修改仓库数据
                    commit("login",data)
                    //将返回的token存在浏览器的本地存储中
                    window.localStorage.setItem("sph_token",data.token)
                }
                return {code,data,message}
            }catch (e) {
                throw new Error(e)
            }
        },
        async logout({commit}){
            try {
                const {code,data} = await logout();
                if(code===OK){
                    //提交mutation 修改仓库数据
                    commit("login",{})
                    //将返回的token存在浏览器的本地存储中
                    window.localStorage.removeItem("sph_token")
                }
                return data
            }catch (e) {
                throw new Error(e)
            }
        },
        async autoLogin({commit}){
            try {
                const {code,data} = await autoLogout();
                if(code===OK){
                    //提交mutation 修改仓库数据
                    commit("login",data)
                }
                return data
            }catch (e) {
                throw new Error(e)
            }
        },
        async register({commit},{phone,password,code:registerCode}){
            try {
                const {code,data} = await register (phone,password,registerCode);
                return  {code,data}
            }catch (e) {
                throw new Error(e)
            }
        },
      }
      
    }
