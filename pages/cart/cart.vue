<template>
	<view>
		<!-- 购物车内容 -->
	 <view class="cart-container" v-if="cart.length !== 0">		
		<my-address></my-address>
		<!-- 购物车-->
		<view class="cart-title">
		  <!-- 左侧的图标 -->
		  <uni-icons type="shop" size="18"></uni-icons>
		  <!-- 描述文本 -->
		  <text class="cart-title-text">购物车</text>
		</view>
		<!-- 商品列表-->
		<uni-swipe-action>
		<block v-for="(goods, i) in cart" :key="i">
		  <uni-swipe-action-item :options="options" @click="reomveGoods(goods)">
		    <my-goods :goods="goods" :showRadio="true" @radioChange="radioHandler" :showNumberBox="true" @numberBox="numberHandler"></my-goods>
		  </uni-swipe-action-item>
		</block>
		</uni-swipe-action>
		<!-- 结算 -->
		<my-account></my-account>
	 </view>
	 <!-- 空白 -->
	 <view class="empty-cart" v-else >
		 <image src="/static/cart_empty@2x.png" class="empty-img"></image>
	 	<text class="empty-txt">空空如也~</text>
	 </view>
	</view>
</template>

<script>
	import tabMixins from '@/mixins/mixins.js'
	import {mapState,mapMutations} from 'vuex'
	export default {
		data() {
			return {
				options:[{
					text:'删除',
					style:{
						backgroundColor:'#C00000'
					}
				}],	
			};
		},
		mixins:[tabMixins],
		computed:{
			...mapState('cart',['cart']),
		},
		methods:{
			//勾选状态
			radioHandler(e){
				console.log(e);
				this.changeChecked(e)
			},
			//修改产品数量
			numberHandler(e){
				console.log(e);
				this.updateGoodsCount(e)
			},
			//点击删除商品
            reomveGoods(goods){
				console.log(goods);
				this.deleteGoods(goods.goods_id)
            },
			...mapMutations('cart',['changeChecked','updateGoodsCount','deleteGoods']),
		},
	}
</script>

<style lang="scss">
.cart-title {
  height: 40px;
  display: flex;
  align-items: center;
  font-size: 14px;
  padding-left: 5px;
  border-bottom: 1px solid #efefef;
  .cart-title-text {
    margin-left: 10px;
  }
}
.empty-cart{
	display: flex;
	flex-direction: column;
	align-items: center;
	padding-top: 100px;
	.empty-img{
		width: 90px;
		height: 90px;
	}
	.empty-txt{
		padding-top: 10px;
		font-size: 14px;
	}
}
</style>
