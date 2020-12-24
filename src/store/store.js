import Vue from 'vue';
import Vuex from 'vuex';
import state from './state';
import getters from './getters';
import mutations from './mutations';
import actions from './actions';
import a from './modules/a'
import search from './modules/search';
import detail from './modules/detail';
import cart from './modules/cart';
import user from './modules/user';
Vue.use(Vuex);
 
export default new Vuex.Store({
    state,
    getters,
    mutations,
    actions,
    modules: {
       a,
       search,
       detail,
       cart,
       user
    }
})