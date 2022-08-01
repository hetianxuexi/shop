//用户地址模块
const actions = {}
const mutations = {
	//更新用户收货地址
	updateAddress(state,address){
		state.address = address
		this.commit('address/saveAddress')
	},
	// 将用户地址保存到本地
	saveAddress(state){
		uni.setStorageSync('address' , JSON.stringify(state.address))
	}
}
const state = {
	address:{}
}
const getters = {}
export default {
	//开启命名空间
	namespaced:true,
	actions,
	mutations,
	state,
	getters
}