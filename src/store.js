import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        isResult: false, //是否显示result组件
    },
    mutations: {
        switchShowResult: function(state){
            state.isResult = state.isResult==0 ? 1 : 0;
        }
    }
})