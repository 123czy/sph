import {getUUID} from "util"
const OK =200;
export default {
    state:{
        // uuid:uuidv4()这样写的uuid是临时的，界面一刷新又要打印一个新的uuid,而正确的是在用户登录之前只能有一个uuid
        uuid:getUUID(),
        userInfo:{}
    },
    mutations:{

    },
    actions:{

    }
}