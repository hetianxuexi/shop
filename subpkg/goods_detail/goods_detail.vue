<template>
	<view>
		<!-- 轮播图 -->
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
			<swiper-item v-for="(item,i) in goodsInfo.pics" :key="i">
				<image :src="item.pics_big" @click="preview(i)"></image>
			</swiper-item>
		</swiper>
		<!-- 商品信息区域 -->
		<view class="goods-info-box" v-if="goodsInfo.goods_name">
		  <!-- 商品价格 -->
		  <view class="price">￥{{goodsInfo.goods_price}}</view>
		  <!-- 信息主体区域 -->
		  <view class="goods-info-body">
		    <!-- 商品名称 -->
		    <view class="goods-name">{{goodsInfo.goods_name}}</view>
		    <!-- 收藏 -->
		    <view class="favi">
		      <uni-icons type="star" size="18" color="gray"></uni-icons>
		      <text>收藏</text>
		    </view>
		  </view>
		  <!-- 运费 -->
		  <view class="yf">快递：免运费</view>
		</view>
		<!-- 商品详情介绍 -->
		<rich-text :nodes="goodsInfo.goods_introduce"></rich-text>
		<!-- 底部导航 -->
		<view class="nav">
			<uni-goods-nav :fill="true"  :options="options" :buttonGroup="buttonGroup"  @click="onClick" @buttonClick="buttonClick" />
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				//商品详情数据
			goodsInfo:{},
			//底部导航数据
			options:[{
			 icon: 'shop',
			 text: '店铺',
		}, {
			icon: 'cart',
			text: '购物车',
		}],
			buttonGroup: [{
			      text: '加入购物车',
			      backgroundColor: '#ffa200',
			      color: '#fff'
			    },
			    {
			      text: '立即购买',
			      backgroundColor: '#ff0000',
			      color: '#fff'
			    }
			    ]
			};
		},
		onLoad(options) {
			//获取商品id
			const goods_id = options.goods_id
			//带着id发请求获取商品详情数据
			this.getGoodsInfo(goods_id)
		},
		methods:{
			async getGoodsInfo(goods_id){
				const {data:res} =await uni.$http.get('/api/public/v1/goods/detail',{goods_id})
				if(res.meta.status !==200) return uni.$showMsg()
				//解决详情图片底部空白间隙和ios无法正常显示webp的问题
				res.message.goods_introduce = res.message.goods_introduce.replace(/<img /g,'<img style="display:block"').replace(/webp/g,'jpg')
				this.goodsInfo = res.message
			},
			//点击放大图片预览效果
			preview(i){
			uni.previewImage({
				current:i,
				urls:this.goodsInfo.pics.map(item=>item.pics_big)
			})
			},
			//点击购物车跳转到购物车页面
			onClick(e){
				if(e.content.text === '购物车'){
					uni.switchTab({
						url:'/pages/cart/cart'
					})
				}
			},
			//点击购买
			buttonClick(){
				
			}
		}
	}
</script>

<style lang="scss">
swiper{
	height: 750rpx;
	image{
		width: 100%;
		height: 100%;
	}
}
.goods-info-box {
  padding: 10px;
  padding-right: 0;

  .price {
    color: #c00000;
    font-size: 18px;
    margin: 10px 0;
  }
  .goods-info-body {
    display: flex;
    justify-content: space-between;

    .goods-name {
      font-size: 13px;
      padding-right: 10px;
    }
    .favi {
      width: 120px;
      font-size: 12px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      border-left: 1px solid #efefef;
      color: gray;
    }
  }
  .yf {
    margin: 10px 0;
    font-size: 12px;
    color: gray;
  }
}
.nav{
	position: fixed;
	width: 100%;
	z-index: 9999;
	left: 0;
	bottom: 0;
}
</style>
