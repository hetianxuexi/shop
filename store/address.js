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
	},
	//更新用户信息
	updateUserInfo(state,userInfo){
		state.userInfo = userInfo
		this.commit('address/saveUserInfo')
	},
	//将用户信息保存到本地
	saveUserInfo(state){
		uni.setStorageSync('userInfo',JSON.stringify(state.userInfo))
	},
	//更新token值
	updateToken(state,token){
		state.token = token
		this.commit('address/saveToken')
	},
	//将token保存到本地
	saveToken(state){
		uni.setStorageSync('token',state.token)
	},
	//更新重定向对象
	updateRedirection(state,info){
		state.redirection = info
		console.log(state.redirection,'hh');
	}
}
const state = {
	address:JSON.parse(uni.getStorageSync('address') || '{}'),
	token:uni.getStorageSync('token') || '',
	userInfo:JSON.parse(uni.getStorageSync('userInfo') || '{}'),
	//重定向的Object对象
	redirection:null
}
const getters = {
	// 计算具体地址
	addstr(state){
		if(!state.address.provinceName) return ''
		return state.address.provinceName + state.address.cityName + state.address.countyName + state.address.detailInfo
	},
	//计算出token
	tokenInfo(state){
		return state.token
	}
}
export default {
	//开启命名空间
	namespaced:true,
	actions,
	mutations,
	state,
	getters
}