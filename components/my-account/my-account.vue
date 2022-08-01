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
		  <view class="btn-settle">结算({{checkedCount}})</view>
	</view>
</template>

<script>
	import {mapGetters,mapMutations} from 'vuex'
	export default {
		name:"my-account",
		data() {
			return {
				
			};
		},
		computed:{
			...mapGetters('cart',['checkedCount','total','checkAllCount']),
			//全选:判断是否全部勾选
			isFullCheck(){
				return this.total === this.checkedCount
			}
		},
		methods:{
			...mapMutations('cart',['updateChecked']),
			changeAllCheck(){
				this.updateChecked(!this.isFullCheck)
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