<template>
	<view class="my-search-container" :style="{'backgroundColor':bgcolor}" @click="searchHandler">
		<view class="my-search-box" :style="{'border-radius':radius +'px'}">
			<uni-icons type="search" size="16"></uni-icons>
			<text class="title">搜索</text>
		</view>
	</view>
</template>

<script>
	export default {
		name:"my-search",
		props:{
			bgcolor:{
				type:String,
				default:'#c00000'
			},
			radius:{
				type:Number,
				default:15
			}
			
		},
		data() {
			return {
				
			};
		},
		methods:{
			//自定义组件需要绑定click事件
			searchHandler(){
				this.$emit("click")
			}
		}
	}
</script>

<style lang="scss">
.my-search-container{
	display: flex;
	align-items: center;
	height: 50px;
	padding: 0 8px;
	.my-search-box{
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 36px;
		background-color: #fff;
		.title{
			font-size: 14px;
			margin-left: 3px;
		}
	}
}
</style>