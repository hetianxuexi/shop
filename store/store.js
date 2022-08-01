import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
//引入各自的模块
import cart from './cart.js'
import address from './address.js'
//初始化store
const store = new Vuex.Store({
	modules:{
		cart,
		address
	}
})
export default store