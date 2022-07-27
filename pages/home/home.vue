<template>
	<view>
		<!-- 轮播图 -->
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true" >
			<swiper-item v-for="(item,goods_id) in swiperList" :key="goods_id">
				<navigator class="swiper-item" :url="'/subpkg/goods_detail/goods_detail?goods_id=' + item.goods_id">
					<image :src="item.image_src"></image>
				</navigator>
			</swiper-item>
		</swiper>
		<!-- 分类 -->
		<view class="nav-list">
			<view class="nav-item" v-for="(item,name) in navList" :key="name" @click="navHandler(item)">
				<image :src="item.image_src" class="nav-img" ></image>
			</view>
		</view>
		<!-- 楼层 -->
		<view class="floor-list">
			<view class="floor-item" v-for="(item,i) in floorList" :key="i">
				<!-- 楼层标题 -->
				<image :src="item.floor_title.image_src" class="floor-title"></image>
				<!-- 楼层图片 -->
				<view class="floor-img" >
					<!-- 左侧大图片 -->
					<navigator class="left-img" :url="item.product_list[0].url">
						<image :src="item.product_list[0].image_src" :style="{width:item.product_list[0].image_width +'rpx'}" mode="widthFix"></image>
					</navigator>
					<!-- 右侧小图片 -->
					<view class="right-img">
						<navigator class="right-img-item" v-for="(item2,i2) in item.product_list" :key="i2" v-if="i2 !== 0" :url="item2.url">
							<image :src="item2.image_src" :style="{width:item2.image_width +'rpx'}" mode="widthFix"></image>
						</navigator>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				//轮播图数据
				swiperList:[],
				//分类数据
				navList:[],
				//楼层数据
				floorList:[]
			};
		},
		onLoad() {
			//调用方法获取轮播图数据
			this.getSwiperList(),
			//调用方法获取分类数据
			this.getNavList(),
			//调用方法获取楼层数据
			this.getFloorList()
		},
		methods:{
			//请求轮播图数据的方法
			async getSwiperList(){
			const {data:res} = await uni.$http.get('/api/public/v1/home/swiperdata')
			// console.log(res)
			//请求失败
			if(res.meta.status !== 200){
			return	uni.$showMsg()
			}
			this.swiperList = res.message
			},
			//请求分类数据的方法
			async getNavList(){
					const {data:res} = await uni.$http.get('/api/public/v1/home/catitems')
					// console.log(res)
					//请求失败
					if(res.meta.status!==200){
						return uni.$showMsg()
					}
					//请求成功
					this.navList = res.message
				},
				//点击分类跳转到分类页面的事件
			navHandler(item){
					if(item.name === '分类'){
						uni.switchTab({
							url:'/pages/cate/cate'
						})
					}
				},
				////请求楼层数据的方法
				async getFloorList(){
				const {data:res} =	await uni.$http.get('/api/public/v1/home/floordata')
				console.log(res);
				//请求失败
				if(res.meta.status !==200){
					return uni.$showMsg()
				}
				//对请求数据进行处理.forEach双重循环
				res.message.forEach(floor=>{
					floor.product_list.forEach(item=>{
						item.url = `/subpkg/goods_list/goods_list?${item.navigator_url.split('?')[1]}`
					})
				})
				this.floorList = res.message
				}
			}
		}
</script>

<style lang="scss">
	swiper{
		height: 330rpx;
	}
.swiper-item,
image {
	width: 100%;
	height: 100%;
}
.nav-list{
	display: flex;
	justify-content: space-around;
	margin: 15rpx 0;
	.nav-img {
		width: 128rpx;
		height: 140rpx;
	}
}
.floor-title{
	 height: 60rpx;
	  width: 100%;
	  display: flex;
}
.floor-img{
	display: flex;
	padding: 10rpx;
}
	.right-img{
		display: flex;
		flex-wrap: wrap;
		justify-content: space-around;
	}
</style>