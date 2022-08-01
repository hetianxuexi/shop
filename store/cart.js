//购物车模块
const actions = {}
const mutations = {
	//保存商品数据
	 addCart(state,goods){
		 const result = state.cart.find(item=>item.goods_id === goods.goods_id)
		 console.log(result);
		 if(!result){
			 state.cart.push(goods)
		 }else{
			 result.goods_count ++
		 }
		console.log(state.cart);
		//调用方法保存在本地
		this.commit('cart/saveStorage')
	 },
	 //保存商品数据到本地
	 saveStorage(state){
		 uni.setStorageSync('cart',JSON.stringify(state.cart))
	 },
	 //修改商品勾选状态
	 changeChecked(state,goods){
		 const result = state.cart.find(item=>item.goods_id === goods.goods_id)
		 if(result){
			 result.goods_state = goods.goods_state
		 }
		 this.commit('cart/saveStorage')
	 },
	 //修改商品数量
	 updateGoodsCount(state,goods){
		  const result = state.cart.find(item=>item.goods_id === goods.goods_id)
		  if(result){
		  			 result.goods_count = goods.goods_count
		  }
		  this.commit('cart/saveStorage')
	 },
	 //删除商品
	 deleteGoods(state,goods_id){
		 state.cart = state.cart.filter(item=>item.goods_id !== goods_id)
		 this.commit('cart/saveStorage')
	 },
	 //更新商品勾选状态
	 updateChecked(state,newState){
		 state.cart.forEach(item=>item.goods_state = newState)
		 this.commit('cart/saveStorage')
	 },

}
const getters = {
	//计算购物车商品总数量
	total(state){
		return state.cart.reduce((total,item)=>total += item.goods_count,0)
	
	},
	//计算已勾选产品总数量
	checkedCount(state){
	   return state.cart.filter(item=>item.goods_state).reduce((total,item)=>total += item.goods_count,0)
	},
	//统计已勾选商品总价格
	checkAllCount(state){
	   return state.cart.filter(item=>item.goods_state).reduce((total,item)=>total += item.goods_count * item.goods_price,0).toFixed(2)
	}
}
const state = {
    // 包含以下属性:{ goods_id, goods_name, goods_price, goods_count, goods_small_logo, goods_state }
	//从本地获取数据
	cart:JSON.parse(uni.getStorageSync('cart') || '[]')
}
export default {
	namespaced: true,
	actions,
	mutations,
	getters,
	state
}