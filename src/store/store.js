import Vue from 'vue';
import Vuex from 'vuex';
import state from './state';
import getters from './getters';
import mutations from './mutations';
import actions from './actions';
import a from './modules/a'
 
export default new Vuex.Store({
    state,
    getters,
    mutations,
    actions,
    modules: {
        a:{
            state:{},
            getters:{},
            mutations:{},
            actions:{} 
        }
    }
})