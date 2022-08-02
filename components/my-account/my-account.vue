<template>
	<view class="account">
		  <!-- 全选区域 -->
		  <label class="radio" @click="changeAllCheck">
		    <radio color="#ff2000" :checked="isFullCheck" style="transform: scale(0.7);" /><text>全选</text>
		  </label>		
		  <!-- 合计区域 -->
		  <view class="amount-box">
		    合计:<text class="amount">￥{{checkAllCount}}</text>
		  </view>	
		  <!-- 结算按钮 -->
		  <view class="btn-settle" @click="settlement">结算({{checkedCount}})</view>
	</view>
</template>

<script>
	import {mapState,mapMutations,mapGetters} from 'vuex'
	export default {
		name:"my-account",
		data() {
			return {
				seconds:3,
				timer:null
			};
		},
		computed:{
			...mapGetters('cart',['checkedCount','total','checkAllCount']),
			// ...mapState('address',['address']),
			...mapGetters('address',['addstr','tokenInfo']),
			//全选:判断是否全部勾选
			isFullCheck(){
				return this.total === this.checkedCount
			}
		},
		methods:{
			...mapMutations('cart',['updateChecked']),
			...mapMutations('address',['updateRedirection']),
			//判断是否全选
			changeAllCheck(){
				this.updateChecked(!this.isFullCheck)
			},
			//结算
			settlement(){
				if(!this.checkedCount) return uni.$showMsg('请选择要结算的商品')
				if(!this.addstr) return uni.$showMsg('请选择收货地址')
				// if(!this.tokenInfo) return uni.$showMsg('请先登录')				
				if(!this.tokenInfo) return this.delayTimer()				
			},
			//倒计时效果
			showTips(n){
				uni.showToast({
					icon:'none',
					title:`请先登录再进行结算! ${n}秒后跳转到登录页面`,
					mask:true,
					duration:1500
				})
			},
			//倒计时函数
			delayTimer(){
				this.seconds = 3
				this.showTips(this.seconds)
				this.timer = setInterval(()=>{
					this.seconds --
					if(this.seconds <= 0){
						clearInterval(this.timer)
						uni.switchTab({
							url:'/pages/my/my',
							success: () => {
								this.updateRedirection({
									openType:'switchTab',
									from:'/pages/cart/cart'
								})
							}
						})
						return
					}
					this.showTips(this.seconds)
				},1000)
			}
		}
	}
</script>

<style lang="scss">
.account{
	   position: fixed;
	    bottom: 0;
	    left: 0;
	    width: 100%;
	    height: 50px;
	    background-color: #f5f5f5;
	    display: flex;
	    justify-content: space-between;
	    align-items: center;
	    padding-left: 5px;
	    font-size: 14px;
		  .radio {
		    display: flex;
		    align-items: center;
		  }		
		  .amount {
		    color: #c00000;
		  }	
		  .btn-settle {
		    height: 50px;
		    min-width: 100px;
		    background-color: #c00000;
		    color: white;
		    line-height: 50px;
		    text-align: center;
		    padding: 0 10px;
		  }
}
</style>